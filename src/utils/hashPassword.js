import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
    if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer')
    }
    // 2nd param is salt (random series of chars hashed along w/ param 1 pwd - to make more secure)
    return bcrypt.hash(password, 10);  // .hash returns a Promise
}

export { hashPassword as default }