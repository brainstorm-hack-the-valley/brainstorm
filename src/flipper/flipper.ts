let connectionLock = false;

export async function connectFlipper(buttonPressed: boolean) {
    if (!("serial" in window.navigator)) {
        console.log("Web Serial API is not supported.");
        return;
    }

    const navigator = window.navigator as Navigator & { serial: any };

    const ports = await navigator.serial.getPorts();
    let port;
    if (ports.length == 0) { 
        if (!buttonPressed) {
            return;
        }
        port = await navigator.serial.requestPort(); 
    } else { 
        port = ports[0];
    }
    await port.open({ baudRate: 230400 });
    console.log(`Connected to flipper on port ${port.getInfo().usbProductId}`);
    return port
}

export async function sendFlipperCommand(port: any, command: string) {
    const writer = port.writable.getWriter();
    await writer.write(new TextEncoder().encode(command + "\r\n"));
    writer.releaseLock();
    console.log(`Sent command to flipper: ${command}`);
}

export async function readFlipperResponse(port: any) {
    const reader = port.readable.getReader();
    const { value, done } = await reader.read();
    reader.releaseLock();
    const text = new TextDecoder().decode(value);
    console.log(`Received response from flipper: ${text}`)
    return text;
}

export async function disconnectFlipper(port: any) {
    await port.close();
    console.log("Disconnected from flipper");
}