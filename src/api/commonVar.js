export const store = {
    state: {
        message: '',
        showSnack: false,
    },
    setMessage(msg) {
        this.state.message = msg
        this.state.showSnack = true
    },
    setShowSnack(showSnack){
        this.state.showSnack = showSnack
    }
}