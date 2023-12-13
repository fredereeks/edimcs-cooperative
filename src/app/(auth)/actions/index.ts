"use server"

import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma"
import { DepositProps, LoanProps, MemberProps, SavingsProps, WithdrawalProps } from "@/types";
import { getServerSession } from "next-auth";

export const fetchUser = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const member = await prisma.member.findUnique({
        where: {
            email: user?.email!
        },
        select: { id: true, firstname: true, middlename: true, lastname: true, image: true, memberId: true, address: true, email: true, phone: true, type: true, loanRating: true, accountDetails: true, savings: { where: { verdict: "Granted" } }, deposits: { where: { verdict: "Granted" } } },
    })
    return member as MemberProps
}

export const fetchDeposits = async (type: string, id: string) => {
    if (type === "Member") {
        const deposits = await prisma.deposit.findMany({
            where: { depositorId: id }, include: { depositor: true }, orderBy: { createdAt: "desc" }
        })
        return deposits?.map(el => ({ ...el, total: deposits?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as DepositProps[]
    }
    else {
        const deposits = await prisma.deposit.findMany({
            include: { depositor: true }, orderBy: { createdAt: "desc" }
        })
        // console.log({adminDeposit: deposits})
        return deposits?.map(el => ({ ...el, total: deposits?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as DepositProps[]
    }
}

// export const fetchInvestment = async (type: string, id: string) => {
//     if (type === "Member") {
//         const investments = await prisma.investment.findMany({
//             where: { investorId: id },
//             include: { investor: true }
//         })
//         return investments?.filter(investment => investment.investorId === id) as InvestmentProps
//     }
//     else {
//         const investments = await prisma.investment.findMany({
//             where: { investorId: id },
//             include: { investor: true }
//         })
//         return investments as InvestmentProps
//     }
// }

export const fetchMembers = async () => {
    const members = await prisma.member.findMany({
        include: { accountDetails: true, deposits: true, loans: true, savings: true, withdrawals: true }, orderBy: { createdAt: "desc" }
    })
    return members as MemberProps[]
}

export const fetchLoans = async (type: string, id: string) => {
    if (type === "Member") {
        const loans = await prisma.loan.findMany({
            where: { loanerId: id }, include: { loaner: true }, orderBy: { createdAt: "desc" }
        })
        return loans?.map(el => ({ ...el, total: loans?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as LoanProps[]
    }
    else {
        const loans = await prisma.loan.findMany({
            include: { loaner: true }, orderBy: { createdAt: "desc" }
        })
        return loans?.map(el => ({ ...el, total: loans?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as LoanProps[]
    }
}

export const fetchSavings = async (type: string, id: string) => {
    if (type === "Member") {
        const savers = await prisma.saving.findMany({
            where: { saverId: id }, include: { saver: true }, orderBy: { createdAt: "desc" }
        })
        return savers?.map(el => ({ ...el, total: savers?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as SavingsProps[]
    }
    else {
        const savers = await prisma.saving.findMany({
            include: { saver: true }, orderBy: { createdAt: "desc" }
        })
        return savers?.map(el => ({ ...el, total: savers?.filter(el => el.verdict === "Granted" || el.status === "Running").reduce((old, item) => item.amount + old, 0) })) as SavingsProps[]
    }
}

export const fetchWithdrawals = async (type: string, id: string) => {
    if (type === "Member") {
        const withdrawers = await prisma.withdrawal.findMany({
            where: { withdrawerId: id }, include: { withdrawer: true }, orderBy: { createdAt: "desc" }
        })
        return withdrawers?.map(el => ({ ...el, total: withdrawers?.filter(el => el.verdict === "Granted" || el.status === "Completed").reduce((old, item) => item.amount + old, 0) })) as WithdrawalProps[]
        // return withdrawers?.filter(withdrawal => withdrawal.withdrawerId === id) as WithdrawalProps[]
        // const withdrawers = await prisma.$queryRaw`SELECT SUM(wd.amount) AS total, wd.id, wd.amount, wd.interest, wd.status, wd.verdict, wd.createdAt, wd.updatedAt, mb.firstname, mb.lastname FROM withdrawal wd LEFT JOIN member mb ON wd.withdrawerId = mb.id WHERE withdrawerId = ${id} ORDER BY wd.createdAt DESC`;
        // return withdrawers as WithdrawalProps[]
    }
    else {
        const withdrawers = await prisma.withdrawal.findMany({
            include: { withdrawer: true }, orderBy: { createdAt: "desc" }
        })
        return withdrawers?.map(el => ({ ...el, total: withdrawers?.filter(el => el.verdict === "Granted" || el.status === "Completed").reduce((old, item) => item.amount + old, 0) })) as WithdrawalProps[]
        // return withdrawers?.map(el => ({...el, total: withdrawers?.filter(withdrawal => withdrawal.withdrawerId === el.id).reduce((old, item) => item.amount + old, 0)}))
        // const withdrawers = await prisma.$queryRaw`SELECT SUM(wd.amount) AS total, wd.id, wd.amount, wd.interest, wd.status, wd.verdict, wd.createdAt, wd.updatedAt, mb.firstname, mb.lastname FROM withdrawal wd LEFT JOIN member mb ON wd.withdrawerId = mb.id ORDER BY wd.createdAt DESC`;
        // return withdrawers as WithdrawalProps[]
    }
}
