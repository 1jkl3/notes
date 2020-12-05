class Socket {
    socket = null;
    isOpen = false;
    url = "ws://127.0.0.1:9998";
    static instance = null;
    static get getInstance() {
        if (!this.instance) {
            this.instance = new Socket();
        }
        return this.instance;
    }
    constructor() {
        this.createSocket()
    }
    createSocket() {
        if ("WebSocket" in window) {
            this.socket = new WebSocket(this.url);
            this.socket.onopen = this.open.bind(this);
            this.socket.onclose = this.close;
            this.socket.onerror = this.error;
        } else {
            this.error(new Error("您的浏览器不支持 WebSocket!"))
        }
    }
    open() {
        this.isOpen = true
        console.log("开启");
    }
    send(payload) {
        if (this.isOpen) {
            if (payload) {
                console.log(this.isOpen);
                this.socket.send(JSON.stringify(payload))
            }
        }
    }
    // 接收消息
    messgae(callback) {
        this.socket.onmessage = e => {
            const data = JSON.parse(e.data)
            callback && callback(data)
        }
    }
    close() {
        this.isOpen = false
        console.log("关闭");
    }
    error(err) {
        this.isOpen = false
        console.log(err);
    }
}
export default Socket.getInstance;