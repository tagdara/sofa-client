export const sl2sb = (color) => {
    var SL = {h:color.h, s:color.s, l:color.l};
    var SB = {hue:color.h, saturation:0, brightness:0};
    var t = SL.s * (SL.l<0.5 ? SL.l : 1-SL.l);
    SB.brightness = SL.l+t;
    SB.saturation = SL.l>0 ? 2*t/SB.brightness : SB.saturation ;
    return SB
}    

export const sb2sl = (color) => {
    var SB = {hue:color.hue, saturation:color.saturation, brightness:color.brightness};
    var SL = {h:color.hue, s:0, l:0};
    SL.l = (2 - SB.saturation) * SB.brightness / 2;
    SL.s = SL.l&&SL.l<1 ? SB.saturation*SB.brightness/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
    return SL
}

export function hex2hsv(hex) {
    const rgb = hex2rgb(hex)
    return rgb2hsv(rgb)
}


function hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function rgb2hsv(r,g,b) {
    if (r && r.r) {
        g = r.g
        b = r.b
        r = r.r
    }
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b);
    let h= c && ((v===r) ? (g-b)/c : ((v===g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return { hue: 60*(h<0?h+6:h), saturation: v&&c/v,  brightness: v }
}

export const decimalToHex = (d)=> {
    var hex = Number(d).toString(16);
    while (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

export const hsl2rgb = (color) => {
    console.log('hsl2rgb', color)
    var r, g, b;
    
    var h=color['hue']
    var s=color['saturation']
    var l=color['brightness']

    if (s === 0){
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    console.log("#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255)))
    return "#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255))
}

export const hsv2rgb = (color) => {
    var h=color['hue']/360
    var s=color['saturation']
    var v=color['brightness']


    var r, g, b, i, f, p, q, t;

    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
        default:  r = v; g = t; b = p; break;
    }
    
    return "#"+decimalToHex(Math.round(r * 255))+ decimalToHex(Math.round(g * 255))+ decimalToHex(Math.round(b * 255))
    /* eslint no-unused-expressions: 0 */
}

export function hsl2hsv(hslString) {
//export function hsl2hsv(hslH, hslS, hslL) {
    console.log('string', hslString)
    const vals = splitHSL(hslString)
	const hsv1 = vals[1] * (vals[2] < 50 ? vals[2] : 100 - vals[2]) / 100;
	const hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (vals[2] + hsv1) * 100;
	const hsvV = vals[2] + hsv1;
    console.log('result hsv',[ vals[0], hsvS, hsvV ] )
	return [ vals[0], hsvS, hsvV ];
}

export function hsv2hsl(hsvH, hsvS, hsvV) {
	const hslL = (200 - hsvS) * hsvV / 100;
	const [ hslS, hslV ] = [
		hslL === 0 || hslL === 200 ? 0 : hsvS * hsvV / 100 / (hslL <= 100 ? hslL : 200 - hslL) * 100,
		hslL * 5 / 10
	];
	return [ hsvH, hslS, hslV ];
}

export const splitHSL = hslString => {
    const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)?%\s*,\s*(\d+(?:\.\d+)?)%\)/g;
    //const regexp = /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?%)\)/g;
    const res = regexp.exec(hslString)
    if (res) {
        const values = res.slice(1).map( val => parseInt(val))
        console.log('values', values)
        return values
    }
}
