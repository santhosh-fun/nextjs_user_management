// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // 1. Clear existing data
    await prisma.auditLog.deleteMany();
    await prisma.session.deleteMany();
    await prisma.userProfile.deleteMany();
    await prisma.user.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();
    await prisma.team.deleteMany();
    await prisma.department.deleteMany();
    await prisma.position.deleteMany();
    await prisma.organization.deleteMany();

    // 2. Seed Organizations
    const organizations = await prisma.organization.createMany({
        data: [
            { name: 'CMS', description: 'Content Management System Organization' },
            { name: 'DMS', description: 'Document Management System Organization' },
            { name: 'GMS', description: 'General Management System Organization' },
        ],
    });

    // 3. Seed Departments
    const departments = await prisma.department.createMany({
        data: [
            { name: 'Production', description: 'Responsible for manufacturing and production', organizationId: 1 },
            { name: 'Development', description: 'Responsible for software development', organizationId: 2 },
            { name: 'Marketing', description: 'Responsible for marketing and sales strategies', organizationId: 3 },
        ],
    });

    // 4. Seed Teams
    const teams = await prisma.team.createMany({
        data: [
            { name: 'Lion', description: 'Focused on aggressive market penetration', organizationId: 1 },
            { name: 'Eagle', description: 'Strategic oversight and innovation', organizationId: 2 },
            { name: 'Matrix', description: 'Cross-functional team for project management', organizationId: 3 },
        ],
    });

    // 5. Seed Roles
    const roles = await prisma.role.createMany({
        data: [
            { name: 'Admin', description: 'Has full access and control over the system' },
            { name: 'User', description: 'Regular user with limited access' },
            { name: 'Customer', description: 'External customer with product access' },
        ],
    });

    // 6. Seed Positions
    const positions = await prisma.position.createMany({
        data: [
            { title: 'Engineer', description: 'Responsible for designing and developing solutions' },
            { title: 'CTO', description: 'Chief Technology Officer overseeing technical direction' },
            { title: 'CEO', description: 'Chief Executive Officer managing overall operations' },
            { title: 'Developer', description: 'Works on software development tasks' },
        ],
    });

    // 7. Seed Users
    const users = await prisma.user.createMany({
        data: [
            {
                email: 'john.doe@example.com',
                password: 'hashed_password', // Hash this properly in real scenarios
                firstName: 'John',
                lastName: 'Doe',
                isActive: true,
                roleId: 1,
                departmentId: 1,
                organizationId: 1,
                teamId: 1,
                positionId: 1,
            },
            {
                email: 'jane.smith@example.com',
                password: 'hashed_password', // Hash this properly in real scenarios
                firstName: 'Jane',
                lastName: 'Smith',
                isActive: true,
                roleId: 2,
                departmentId: 2,
                organizationId: 2,
                teamId: 2,
                positionId: 2,
            },
            {
                email: 'mike.jones@example.com',
                password: 'hashed_password', // Hash this properly in real scenarios
                firstName: 'Mike',
                lastName: 'Jones',
                isActive: true,
                roleId: 3,
                departmentId: 3,
                organizationId: 3,
                teamId: 3,
                positionId: 3,
            },
            {
                email: 'emily.brown@example.com',
                password: 'hashed_password', // Hash this properly in real scenarios
                firstName: 'Emily',
                lastName: 'Brown',
                isActive: true,
                roleId: 2,
                departmentId: 1,
                organizationId: 1,
                teamId: 1,
                positionId: 3,
            },
            {
                email: 'alice.williams@example.com',
                password: 'hashed_password', // Hash this properly in real scenarios
                firstName: 'Alice',
                lastName: 'Williams',
                isActive: true,
                roleId: 1,
                departmentId: 2,
                organizationId: 2,
                teamId: 2,
                positionId: 1,
            },
        ],
    });

    // 8. Seed Permissions
    const permissions = await prisma.permission.createMany({
        data: [
            { name: 'View Dashboard', description: 'Permission to view the dashboard' },
            { name: 'Edit Content', description: 'Permission to edit content' },
            { name: 'Manage Users', description: 'Permission to manage users' },
            { name: 'View Reports', description: 'Permission to view reports' },
        ],
    });

    // 9. Assign permissions to roles (Example assignments)
    await prisma.role.update({
        where: { id: 1 },
        data: {
            permissions: {
                connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
            },
        },
    });

    await prisma.role.update({
        where: { id: 2 },
        data: {
            permissions: {
                connect: [{ id: 1 }, { id: 4 }],
            },
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
