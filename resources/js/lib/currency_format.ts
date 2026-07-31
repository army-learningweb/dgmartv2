export const vndFormat = (number: number) => {
    const formated = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    return formated.format(number);
}