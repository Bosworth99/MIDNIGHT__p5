export default function Sketch(s) {
    let x, y, backgroundColor;

    let width = s.windowWidth;
    let height = s.windowHeight;

    s.setup = () => {
        s.createCanvas(width, height);
        backgroundColor = s.color(s.random(255), s.random(255), s.random(255));

        x = s.random(width);
        y = height / 2;
    };

    s.draw = () => {
        s.background(backgroundColor);
        s.fill(s.color(255, 0, 0));
        s.ellipse(x, y, 100, 100);

        x = (x + 1) % width;
    };

    s.mousePressed = () => {
        backgroundColor = s.color(s.random(255), s.random(255), s.random(255));
    };

    s.windowResized = () => {
        width = s.windowWidth;
        height = s.windowHeight;
        s.resizeCanvas(width, height);
    }
}
