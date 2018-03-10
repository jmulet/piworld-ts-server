function pathJoin(a, b) {
    var a2 = a.trim();
    var b2 = b.trim();
    if (a2[a2.length - 1] === "/") {
        a2 = a2.substr(0, a2.length - 1);
    }
    if (b2[0] === "/") {
        b2 = b2.substr(b, b2.length - 1);
    }
    return a2 + "/" + b2;
}

