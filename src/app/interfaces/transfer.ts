export interface Transfer {
    sourceAccount: string,
    destinationAccount: string,
    transferAmount: number,
    appliedFee: number,
    transferDate: string,
    schedulingDate: string
}

export interface BackendReturn{
    content: Transfer[]
}