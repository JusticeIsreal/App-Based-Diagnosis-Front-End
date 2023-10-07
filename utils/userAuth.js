/**
 * If the key exists in sessionStorage, return true, otherwise return false.
 * @returns A function that returns a boolean value.
 */
const checkAuthKey = () => {
    let key = sessionStorage.getItem('authKey')

    if (key) 
        return true

    return false
}

/**
 * This function sets the authKey in sessionStorage, and returns true if it succeeds, and false if it
 * fails.
 * @param key - The key to store in sessionStorage
 * @returns A function that takes a key as an argument and returns a boolean.
 */
const setAuthKey = (key) => {
    try{
        sessionStorage.setItem('authKey', key)
        return true
    } catch (e) {
        return false
    }
}

/**
 * It removes the authKey from sessionStorage.
 * @returns A function that removes the authKey from sessionStorage.
 */
const deleteAuthKey = () => {
    try{
        sessionStorage.removeItem('authKey')
        return true
    } catch (e) {
        return false
    }
}

/**
 * If the sessionStorage object has an item called authKey, return it. Otherwise, return null.
 * @returns The value of the key "authKey" in sessionStorage.
 */
const getAuthKey = () => {
    return sessionStorage.getItem("authKey")
}

/**
 * It returns the userInfo object from sessionStorage.
 * @returns The userInfo object from sessionStorage.
 */
const getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem("userInfo"))
}

const updateUserInfo = (fields) => {
    let user = JSON.parse(sessionStorage.getItem("userInfo"))
    let newFields = {
        firstname: fields.username.length > 0,
        lastname: fields.username.length > 0,
        number: fields.username.length > 0,
    }
    user.fields = newFields
    return setUserInfo(user)
}

/**
 * It takes a user object and tries to store it in sessionStorage. If it succeeds, it returns true,
 * otherwise it returns false.
 * @param user - the user object
 * @returns A function that takes a user object and returns true or false.
 */
const setUserInfo = (user) => {
    try{
        sessionStorage.setItem('userInfo', JSON.stringify(user))
        return true
    } catch (e) {
        return false
    }
}


export { 
    checkAuthKey,
    setAuthKey,
    deleteAuthKey,
    getAuthKey,
    getUserInfo,
    updateUserInfo,
    setUserInfo
}