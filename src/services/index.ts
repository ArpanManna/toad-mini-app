export async function sleep(timer) {
    return new Promise((res) => {
        setTimeout(() => {
            res(1)
        }, timer);
    })
}