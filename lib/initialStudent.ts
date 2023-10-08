import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const initialStudent = async () => {
    const user = await currentUser();

    if (!user) {
        return redirectToSignIn({ returnBackUrl: 'http://localhost:3000/sign-in' });
    }

    const student = await db.student.findUnique({
        where: {
            id: user.id
        }
    });

    if (student) {
        return student;
    }

    const newStudent = await db.student.create({
        data: {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            image_url: user.imageUrl,
            email: user.emailAddresses[0].emailAddress!
        }
    });

    return newStudent;
};