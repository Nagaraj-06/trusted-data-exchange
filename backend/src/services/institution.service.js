const { prisma } = require("../config/db");
const bcrypt = require("bcrypt");

/**
 * Bulk creates student users with generated roll numbers
 * @param {Object} institutionAdmin - The authenticated institution admin user
 * @param {Array} studentsData - Array of objects containing { name, email, batchYear, deptCategory, deptCode }
 * @returns {Promise<Array>} - List of created users
 */
async function bulkCreateStudents(institutionAdmin, studentsData) {
    let institutionId = institutionAdmin.institutionId;

    if (!institutionId) {
        // Fallback for existing session tokens missing the institutionId
        const dbUser = await prisma.user.findUnique({
            where: { id: institutionAdmin.id },
            select: { institutionId: true }
        });
        institutionId = dbUser?.institutionId;
    }

    if (!institutionId) {
        const err = new Error("User is not linked to an institution");
        err.statusCode = 403;
        throw err;
    }

    const createdStudents = [];
    const errors = [];

    for (const student of studentsData) {
        try {
            console.log("Processing student data row:", student);
            const { name, email, batchYear, deptCategory, deptCode } = student;

            // Validate input
            if (!name || !email || !batchYear || !deptCategory || !deptCode) {
                const missing = [];
                if (!name) missing.push('name');
                if (!email) missing.push('email');
                if (!batchYear) missing.push('batchYear');
                if (!deptCategory) missing.push('deptCategory');
                if (!deptCode) missing.push('deptCode');

                throw new Error(`Missing required fields: ${missing.join(', ')}. Please ensure you are using the Student Onboarding template, not the Records template.`);
            }

            console.log("Validation passed for:", email);

            // Generate Roll Number: 7376YYCDTXXX
            const YY = String(batchYear).slice(-2);
            const C = deptCategory === 'CORE' ? '1' : '2';
            const DT = String(deptCode).toUpperCase();

            // Find the current highest sequence for this prefix
            const prefix = `7376${YY}${C}${DT}`;
            const lastStudent = await prisma.user.findFirst({
                where: {
                    rollNumber: {
                        startsWith: prefix
                    }
                },
                orderBy: {
                    rollNumber: 'desc'
                }
            });

            let XXX = 100;
            if (lastStudent && lastStudent.rollNumber) {
                const lastXXX = parseInt(lastStudent.rollNumber.slice(-3));
                if (!isNaN(lastXXX)) {
                    XXX = lastXXX + 1;
                }
            }

            const rollNumber = `${prefix}${String(XXX).padStart(3, '0')}`;

            // Create User
            const hashedPassword = await bcrypt.hash(`Welcome@${rollNumber}`, 10);

            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'STUDENT',
                    institutionId,
                    rollNumber
                }
            });

            createdStudents.push(newUser);
        } catch (err) {
            errors.push({ student: student.email, error: err.message });
        }
    }

    return { createdStudents, errors };
}

/**
 * Get all students for an institution
 */
async function getInstitutionStudents(institutionId) {
    if (!institutionId) return [];
    return prisma.user.findMany({
        where: {
            institutionId,
            role: 'STUDENT'
        },
        orderBy: {
            rollNumber: 'asc'
        }
    });
}

module.exports = {
    bulkCreateStudents,
    getInstitutionStudents
};
