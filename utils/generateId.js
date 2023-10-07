const getId = () => {
    let time = new Date();

    let random = "abcd-";

    random += Math.random().toString(36).substring(2, 9)

    random += Date.parse(time)

    return random;
}

export { getId }