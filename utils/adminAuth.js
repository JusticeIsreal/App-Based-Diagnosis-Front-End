import Cookies from "js-cookie"

const checkAdminAuthKey = () => {
    let key = Cookies.get('adminKey')

    if (key) 
        return true

    return false
}

const setAdminAuthKey = (key) => {
    try{
        Cookies.set('adminKey', key, { expires: 1})
        return true
    } catch (e) {
        return false
    }
}

const deleteAdminAuthKey = () => {
    try{
        Cookies.remove('adminKey')
        return true
    } catch (e) {
        return false
    }
}

const getAdminAuthKey = () => {
    return Cookies.get("adminKey")
}

export {
    checkAdminAuthKey,
    setAdminAuthKey,
    deleteAdminAuthKey,
    getAdminAuthKey
}