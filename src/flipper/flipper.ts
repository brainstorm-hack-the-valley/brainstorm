let connectionLock = false;

export async function connectFlipper(buttonPressed: boolean) {
    if (!("serial" in window.navigator)) {
        console.log("Web Serial API is not supported.");
        return;
    }

    console.log(`Connecting to flipper (button pressed: ${buttonPressed})`);

    const navigator = window.navigator as Navigator & { serial: any };

    const ports = await navigator.serial.getPorts();
    let port = null;
    if (ports.length == 0) { 
        if (!buttonPressed) {
            return;
        }
    } else {
        for (const p of ports) {
            // Flipper vendor id is 0483 and Product ID (PID) is 5740.
            if (p.getInfo().usbVendorId === 0x483 && p.getInfo().usbProductId === 0x5740) {
                port = p;
                console.log(`Found existing flipper on port.`);
                break;
            }
        }
        if (!port && !buttonPressed) {
            return
        }
    }
    if (!port) {
        console.log("Requesting flipper port.");
        port = await navigator.serial.requestPort(); 
    }
    if (port.readable) {
        console.log("Closing existing flipper port.");
        await port.close();
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