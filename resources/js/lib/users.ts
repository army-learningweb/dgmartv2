export const userAvatar = (name: string) => {
    const arrayWords = name.split(' ');
    if (arrayWords.length > 1) {
        const firstNameLetter = arrayWords[0][0].toUpperCase();
        const lastNameLetter = arrayWords[arrayWords.length - 1][0].toUpperCase();
        return `${firstNameLetter}${lastNameLetter}`;
    }
    return arrayWords[0][0].toUpperCase();
};
