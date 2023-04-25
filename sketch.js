function setup() {
    createCanvas(1080, 720)
    circulo1 = 350 / 4;
    circulo2 = 650 / 2;
    circulo3 = (750 / 4) * 3;
    circY = height / 2;
    r = 100;
}

function draw() {
    background(0, 0, 0);
    strokeWeight(2);
    stroke(223,250,113);
    textSize(30);
    text('Jesus Enrique Dominguez Maruko',0,50);
    text('Examen Unidad 2',0,100)
    puntoMedio(circulo1, circY, r);
    puntoMedio(circulo2, circY, r);
    puntoMedio(circulo3, circY, r);

    n = parseInt(prompt("Escribe en cuántas partes se va a dividir el círculo: "));
    angle = 2 * PI / n;

    

    text('Punto Pendiente',0,200);

    for (let i = 0; i < n; i++) {
        let xLinea = circulo1 + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        puntoPendiente(circulo1, circY, xLinea, yLinea);
    }
    text('DDA',300,200);
    for (let i = 0; i < n; i++) {
        let xLinea = circulo2 + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        dda(circulo2, circY, xLinea, yLinea);
    }
    text('Bresenham',500,200);
    for (let i = 0; i < n; i++) {
        let xLinea = circulo3 + r * cos(i * angle);
        let yLinea = circY + r * sin(i * angle);
        bresenham(circulo3, circY, xLinea, yLinea);
    }

    noLoop()
}




function puntoMedio(x, y, radio){
    let xAux = 0
    let yAux = radio
    let d = 1 - radio

    while (xAux <= yAux) {
        point(x + xAux, y + yAux)
        point(x + yAux, y + xAux)
        point(x - xAux, y + yAux)
        point(x - yAux, y + xAux)
        point(x + xAux, y - yAux)
        point(x + yAux, y - xAux)
        point(x - xAux, y - yAux)
        point(x - yAux, y - xAux)
        
        if (d < 0) {
            d += 2 * xAux + 3
        } else {
            d += 2 * (xAux - yAux) + 5
            yAux--
        }
        xAux++
    }
}



function puntoPendiente(x1,y1, x2,y2) {
    aumX = 0

    if (x1 > x2)
        aumX = -1
    else if(x1 < x2)
        aumX = 1
    
    if (x1 === x2) {
        x = x1

        if (y1 > y2) {
            aumY = -1
        }
        else{
            aumY = 1
        }

        if(aumY == 1) {
            for (var y = y1; y < y2; y += aumY) {
                point(x, y)
            }
        }
        else {
            for (var y = y1; y > y2; y += aumY) {
                point(x, y)
            }
        }
        
    }
    else {
        m = (y2 - y1) / (x2 - x1)
        p = y1 - (m * x1)
        if(aumX == 1){
            for (var x = x1; x < x2; x += aumX) {
                y = (m * x) + p
                point(x,y)
            }
        }
        else{
            for (var x = x1; x > x2; x += aumX) {
                y = (m * x) + p
                point(x,y)
            }
        }
    }
}



function dda(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    let aumX = dx / steps;
    let m = dy / steps;
    let x = x1;
    let y = y1;
    
    for (let i = 0; i <= steps; i++) {
        point(x, y);
        x += aumX;
        y += m;
    }
}



function bresenham(x1, y1, x2, y2) {
    let dx = abs(x2 - x1)
    let dy = abs(y2 - y1)
    let aumX = (x1 < x2) ? 1 : -1
    let aumY = (y1 < y2) ? 1 : -1
    let err = dx - dy

    if(aumX == 1){
        if(aumY == 1){
            while (x1 <= x2 && y1 <= y2) {
                point(x1, y1)
                let e2 = 2 * err
                if (e2 > -dy) {
                    err -= dy
                    x1 += aumX
                }
                if (e2 < dx) {
                    err += dx
                    y1 += aumY
                }
            }
        }
        else if(aumY == -1){
            while (x1 <= x2 && y1 >= y2) {
                point(x1, y1)
                let e2 = 2 * err
                if (e2 > -dy) {
                    err -= dy
                    x1 += aumX
                }
                if (e2 < dx) {
                    err += dx
                    y1 += aumY
                }
            }
        }
    }
    else if(aumX == -1){
        if(aumY == 1){
            while (x1 >= x2 && y1 <= y2) {
                point(x1, y1)
                let e2 = 2 * err
                if (e2 > -dy) {
                    err -= dy
                    x1 += aumX
                }
                if (e2 < dx) {
                    err += dx
                    y1 += aumY
                }
            }
        }
        else if(aumY == -1){
            while (x1 >= x2 && y1 >= y2) {
                point(x1, y1)
                let e2 = 2 * err
                if (e2 > -dy) {
                    err -= dy
                    x1 += aumX
                }
                if (e2 < dx) {
                    err += dx
                    y1 += aumY
                }
            }
        }
    }
}