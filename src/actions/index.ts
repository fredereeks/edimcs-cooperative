"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";
import nodeMailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import { MemberRating, MemberType, TransStatus, TransVerdict } from "@prisma/client";
// import db from "@/lib/db"

export const makeSaving = async (data: FormData) => {
  try {
    const amount = Number(data.get("amount")?.valueOf());
    const saverId = data.get("saverId")?.valueOf().toString();
    const savings = await prisma.saving.create({
      data: {
        amount, saverId: saverId!
      }
    })
  } catch (error) {
    return {
      error: true,
      message: "Unable to process your savings request."
    }
  }
}

// export const acceptSaving = async()

export const handleContact = async (data: FormData) => {
  "use server"
  try {
    const firstname = data.get("firstname")?.valueOf()?.toString() || "";
    const lastname = data.get("lastname")?.valueOf()?.toString() || "";
    const email = data.get("email")?.valueOf()?.toString() || "";
    const phone = data.get("phone")?.valueOf()?.toString() || "";
    const message = data.get("message")?.valueOf()?.toString() || "";

    // Save to Database
    // const contactMessage = await prisma.contact.create({data: {
    //     firstname, lastname, email, phone: phone || null, message
    // }})
    await prisma.contact.create({
      data: {
        firstname, lastname, phone, message, email
      }
    })
    // console.log({contactMessage})
    // console.log({ firstname, lastname, email, phone, message })
    const html = `
                <section className="flex flex-col">
                    <h2 style="color: rgb(51,65,85); text-align: center; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem; border-bottom: 1px solid #eee; margin: .5rem; padding-bottom: .5rem;" className="text-slate-700 text-center">New Contact Message!</h2>
                    <div className="flex gap-1">
                    div style="background: rgb(33, 150, 243); color: white; text-align: center; border-radius: 5px;" className="h-10 w-10 rounded-full bg-primary flex-shrink-0">Contact Details</div>
                        <div className="flex flex-col flex-1">
                            <h4 style="color: #848484; font-weight: bold; font-size: 1.125rem; line-height: 1.6rem;" className="font-bold text-slate-600 text-lg">${firstname} ${lastname}</h4>
                            <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Email: ${email}</p>
                            <p style="color: rgb(100,116,139); font-size: 0.75rem; line-height: 1rem;" className="text-xs text-slate-500">Phone Number: ${phone}</p>
                        </div>
                        <p style="color: rgb(100,116,139); font-size: 0.875rem; line-height: 1.25rem;" className="text-sm text-slate-700 text-justify">${message}</p>
                    </div>
                </section>
            `;
    const transport = nodeMailer.createTransport({
      // host: 'smtp.gmail.com',
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    })

    // const userMail = typeof(email) === 'string' ? email.toString() || "invalidmail@gmail.com"

    const info = transport.sendMail({
      // from: `EDIMCS.com <brunomany1@gmail.com>`,
      from: `EDIMCS.com <${process.env.MAIL_FROM}>`,
      to: ['EDIMCS Admin <brytjunioriaku@gmail.com>', 'EDIMCS Admin <brunomany1@gmail.com>'],
      bcc: 'EDIMCS Admin <adefredy1@gmail.com>',
      replyTo: email?.toString(),
      subject: 'New Contact Message from EDIMCS',
      html
    }, (err, info) => {
      if (err) {
        return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
      }
      console.log(`Message sent: ${info?.messageId}`)
    })
    // console.log({ info })
    revalidatePath("/contact")
    return { error: false, message: `Thank you for reaching our to us ${firstname} ${lastname}. Expect our reply soonest.` };


  } catch (error) {
    console.log({ error })
    return { error: true, message: `Something went wrong. We could not send the mail...Please, try again` };
  }
}

export const handleSignup = async (data: FormData) => {
  try {
    const firstname = data.get("firstname")?.valueOf() as string
    const lastname = data.get("lastname")?.valueOf() as string
    const email = data.get("email")?.valueOf() as string
    const middlename = data.get("middlename")?.valueOf() as string
    const password = data.get("password")?.valueOf() as string
    const rawPhone = data.get("phone")?.valueOf() as string
    const phone = rawPhone.replaceAll(" ", "")
    const loanRating = data.get("loanRating")?.valueOf() as string
    const memberId = `EDIMCS-${Math.random().toString().slice(4, 8)}${Date.now().toString().slice(8, 10)}`
    // const randomToken = Buffer.from(crypto.randomUUID()).toString('base64')
    const user = await prisma.member.findFirst({
      where: {
        email
      }
    })
    if (user) {
      if (user.email) {
        return {
          error: true,
          message: "A user with this email already exists"
        }
      }
      else {
        return {
          error: true,
          message: "A user with that Member ID already exists. If this is you, login instead."
        }
      }
    }
    const salt = bcryptjs.genSaltSync(10), hashPassword = bcryptjs.hashSync(password, salt)
    const newUser = await prisma.member.create({
      data: {
        memberId: memberId.toUpperCase(),
        firstname,
        middlename,
        lastname,
        phone,
        loanRating: loanRating === "Basic" ? "Basic" : loanRating === "Standard" ? "Standard" : loanRating === "Standard Plus" ? "StandardPlus" : "Premium",
        password: hashPassword,
        email: email.toLowerCase(),
      }
    })
    if (newUser) {
      return {
        error: false,
        message: `Welcome, ${firstname} ${middlename} ${lastname}. Glad to have you join our team!`
      }
    }
    else {
      return {
        error: true,
        message: "Something went wrong. We could not create your account. Please, try again"
      }
    }

  } catch (err) {
    // const error = err as AxiosError;
    return {
      error: true,
      message: "Something went wrong, please, try again. " + err
    }
  }
}

// CREATE ACTIONS
export const handleSavings = async (data: FormData) => {
  const saverId = data.get("saver")?.valueOf() as string
  const amount = Number(data.get("amount")?.valueOf())
  const savings = await prisma.saving.create({
    data: { amount, saverId }
  })
  if (savings) {
    // revalidatePath("/dashboard/savings")
    return { error: false, message: `New Savings Request of ₦${amount.toLocaleString()} Made. Awaiting admin approval` }
  }
  else {
    return { error: true, message: "Something went wrong. We could not lodge your saving. Please, try again" }
  }
}

export const handleLoans = async (data: FormData) => {
  const loanerId = data.get("loaner")?.valueOf() as string
  const amount = Number(data.get("amount")?.valueOf())
  const loans = await prisma.loan.create({
    data: { amount, loanerId }
  })
  if (loans) {
    // revalidatePath("/dashboard/savings")
    return { error: false, message: `New Loan Request of ₦${amount.toLocaleString()} Made. Awaiting admin approval` }
  }
  else {
    return { error: true, message: "Something went wrong. We could not lodge your saving. Please, try again" }
  }
}

export const handleDeposits = async (data: FormData) => {
  const depositorId = data.get("depositor")?.valueOf() as string
  const amount = Number(data.get("amount")?.valueOf())
  const deposits = await prisma.deposit.create({
    data: { amount, depositorId }
  })
  if (deposits) {
    // revalidatePath("/dashboard/savings")
    return { error: false, message: `New Deposit Request of ₦${amount.toLocaleString()} Made. Awaiting admin approval` }
  }
  else {
    return { error: true, message: "Something went wrong. We could not lodge your saving. Please, try again" }
  }
}

export const handleWithdrawal = async (data: FormData) => {
  const withdrawerId = data.get("withdrawer")?.valueOf() as string
  const amount = Number(data.get("amount")?.valueOf())
  const withdrawals = await prisma.withdrawal.create({
    data: { amount, withdrawerId }
  })
  if (withdrawals) {
    // revalidatePath("/dashboard/savings")
    return { error: false, message: `New Deposit Request of ₦${amount.toLocaleString()} Made. Awaiting admin approval` }
  }
  else {
    return { error: true, message: "Something went wrong. We could not lodge your saving. Please, try again" }
  }
}

// PUT ACTIONS
export const updateProfile = async (data: FormData) => {
  try {
    const id = data.get("id")?.valueOf() as string
    const firstname = data.get("firstname")?.valueOf() as string
    const middlename = data.get("middlename")?.valueOf()?.toString() || ""
    const lastname = data.get("lastname")?.valueOf() as string
    const phone = data.get("phone")?.valueOf() as string
    const address = data.get("address")?.valueOf() as string
    const email = data.get("email")?.valueOf() as string
    const confirmPassword = data.get("confirm-password")?.valueOf() as string
    const plainPassword = data.get("password")?.valueOf() as string
    const currentPassword = data.get("extra")?.valueOf() as string
    // Confirm Password
    const matchPassword = bcryptjs.compareSync(confirmPassword, currentPassword)
    if (!matchPassword) return { error: true, message: "Invalid user confirmation password supplied. This must match your current password" }
    else {
      const findSimilarUser = await prisma.member.findUnique({
        where: { email: email.toLowerCase(), phone, NOT: { id } },
      })
      if (findSimilarUser) return { error: true, message: "Sorry. There is a member with that email or phone number. Please, try another" }
      const salt = await bcryptjs.genSalt(10)
      const password = plainPassword.trim() === "" ? currentPassword : await bcryptjs.hash(plainPassword, salt)
      await prisma.member.update({
        where: { id },
        data: {
          firstname, middlename, lastname, phone, email: email.toLowerCase(), password, address
        }
      })
      revalidatePath("/dashboard/profile")
    }
    return { error: false, message: `Profile Updated Successfully.` }
  } catch (err) {
    return { error: true, message: "Something went wrong while attempting to make your request, please, try again." }
  }
}
export const updateAccountDetails = async (data: FormData) => {
  try {
    const id = data.get("id")?.valueOf().toString()!
    const banker = data.get("banker")?.valueOf() as string
    const accountnumber = data.get("accountnumber")?.valueOf() as string
    const bvn = data.get("bvn")?.valueOf() as number
    const type = data.get("type")?.valueOf()?.toString() || ""
    const confirmPassword = data.get("confirm-password")?.valueOf() as string
    const currentPassword = data.get("extra")?.valueOf() as string
    // Confirm Password
    const matchPassword = bcryptjs.compareSync(confirmPassword, currentPassword)
    if (!matchPassword) return { error: true, message: "Invalid user confirmation password supplied. This must match your current password" }
    else {
      await prisma.accountNumber.upsert({
        where: {
          memberId: id
        },
        create: {
          accountnumber, bvn, memberId: id, type: type === "Savings" ? "Savings" : type === "Current" ? "Current" : "Fixed", banker,
        },
        update: { accountnumber, bvn, memberId: id, type: type === "Savings" ? "Savings" : type === "Current" ? "Current" : "Fixed", banker, }
      })
      revalidatePath("/dashboard/profile")
    }
    return { error: false, message: `Account Updated Successfully.` }
  } catch (err) {
    return { error: true, message: "Something went wrong while attempting to make your request, please, try again." }
  }
}

export const handleLoanRepayment = async (data: FormData) => {
  const loanerId = data.get("loaner")?.valueOf() as string
  const payback = Number(data.get("payback")?.valueOf())
  const loan = await prisma.loan.update({
    where: { id: loanerId },
    data: { payback: {increment: payback } },
  })
  if (loan) {
    if(loan.amount === loan.payback) {
      // CLEAR LOAN IF RE-PAYMENT IS COMPLETE
      await prisma.loan.update({
        where: {id: loanerId},
        data: {status: "Completed"}
      })
    }
    // revalidatePath("/dashboard/savings")
    return { error: false, message: `New Loan Repayment of ₦${payback.toLocaleString()} Made Successfully.` }
  }
  else {
    return { error: true, message: "Something went wrong. We could not lodge your saving. Please, try again" }
  }
}

// MEMBER TYPE ACTIONS
export const memberStatusAction = async (id: string, type: string) => {
  try {
    await prisma.member.update({
      where: {id}, data: {type: MemberType[type as keyof typeof MemberType]}
    })
    return { error: false, message: `This User is now ${type === "Member" ? 'a' : 'an'} ${type[0].toUpperCase()}${type.slice(1)}` }
  }
  catch (err) {
    return { error: true, message: "Something went wrong while attempting to make your request, please, try again." }
  }
}
// MEMBER UPGRADE ACTIONS
export const memberUpgradeAction = async (id: string, type: string) => {
  try {
    await prisma.member.update({
      where: {id}, data: {loanRating: MemberRating[type as keyof typeof MemberRating]}
    })
    return { error: false, message: `This Member Loan Entitlement has now been changed to ${type[0].toUpperCase()}${type.slice(1)}` }
  }
  catch (err) {
    return { error: true, message: "Something went wrong while attempting to make your request, please, try again." }
  }
}
// VERDICT ACTIONS
export const verdictAction = async (table: string, id: string, verdict: string, interest: number, amount?:number) => {
  try {
    let status = verdict === "Granted" && table === "loan" ? "Running" : verdict === "Granted" && table !== "loan" ? "Completed" : "Suspended"
    let transaction;
    if (table === "loan") {
      if (verdict === "Granted") {
        transaction = await prisma.loan.update({
          where: { id },
          data: {
            verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest, 
            // loaner: { update: { balance: { increment: (interest + amount!) } } }
          }
        })
      }
      else {
        transaction = await prisma.loan.update({
          where: { id },
          data: { verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus] }
        })
      }
    }
    else if (table === "deposit") {
      if (verdict === "Granted") {
        transaction = await prisma.deposit.update({
          where: { id },
          data: {
            verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest, depositor: {
              update: { balance: { increment: (interest + amount!) } }
            }
          }
        })
      }
      else {
        transaction = await prisma.deposit.update({
          where: { id },
          data: { verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest }
        })
      }
    }
    else if (table === "saving") {
      if (verdict === "Granted") {
        transaction = await prisma.saving.update({
          where: { id },
          data: {
            verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest, saver: {
              update: { balance: { increment: (interest + amount!) } }
            }
          }
        })
      }
      else {
        transaction = await prisma.saving.update({
          where: { id },
          data: { verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest }
        })
      }
    }
    else {
      if (verdict === "Granted") {
        transaction = await prisma.withdrawal.update({
          where: { id },
          data: {
            verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest, withdrawer: {
              update: { balance: { decrement: (interest + amount!) } }
            }
          }
        })
      }
      else {
        transaction = await prisma.withdrawal.update({
          where: { id },
          data: { verdict: TransVerdict[verdict as keyof typeof TransVerdict], status: TransStatus[status as keyof typeof TransStatus], interest }
        })
      }
    }
    return { error: false, message: `${table[0].toUpperCase()}${table.slice(1)} has been successfully ${verdict}` }
  }
  catch (err) {
    return { error: true, message: `Something went wrong while attempting to make your request, please, try again. ${err}` }
  }
}