export const calTotal = (transactions: any): number => {
    let val = 0;
    transactions.map((tl: any) => {
        if(tl.value){
            val = val + tl.value
        }
    })
    return val;
}