class Mango{
    constructor(x, y) {
        var options = {
            isStatic:true,
            restitution:0,
            friction:1
        }
        this.radius = 50;
        this.body = Bodies.circle(x, y, this.radius/2, options);
        this.image = loadImage("sprites/mango.png");
        
        World.add(world, this.body);
    }
    display(){
        var pos = this.body.position;
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.radius, this.radius);
    }
}