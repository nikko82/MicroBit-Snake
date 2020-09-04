input.onButtonPressed(Button.A, function () {
	dir = ((dir - 1) % 4)
    if (dir < 0)
        dir += 4
    serial.writeLine("Direction: " + dir)
})

input.onButtonPressed(Button.B, function () {
	dir = ((dir + 1) % 4)
    serial.writeLine("Direction: " + dir)
})

let y = 0
let x = 0
let foodX = 2
let foodY = 2
let list_y: number[] = []
let list_x: number[] = []
let length = 1
enum direction
{
    right = 0,
    down = 1,
    left = 2,
    up = 3
}
let dir: direction = direction.right

let init = function() {
    y = 0
    x = 0
    foodX = 2
    foodY = 2
    list_y = []
    list_x = []
    length = 1
    dir = direction.right
    list_x.unshift(0)
    list_y.unshift(0)
    led.plot(x, y)
    led.plot(foodX, foodY)
}

init()

basic.forever(function () {
    if (dir == direction.right) {
        x = ((x + 1) % 5)
    } else if (dir == direction.left) {
        x = ((x - 1) % 5)
        if(x < 0)
            x += 5
    } else if (dir == direction.up) {
        y = ((y - 1) % 5)
        if (y < 0)
            y += 5
    } else if (dir == direction.down) {
        y = ((y + 1) % 5)
    }

    let crash = false
    for(let i = 0; i < list_x.length-1; i++)
    {
        if(list_x[i] == x && list_y[i] == y)
        {
            crash = true
            break
        }
    }

    if (crash)
    {
        basic.clearScreen()
        basic.showString("Game over!")
        basic.clearScreen()
        list_x = [0]
        list_y = [0]
        init()
    }
    else
    {
        led.plot(x, y)
        list_x.insertAt(0, x)
        list_y.insertAt(0, y)

        if(x == foodX && y == foodY)
        {
            while(true)
            {
                let invalid = false
                foodX = randint(0, 4)
                foodY = randint(0, 4)
                for(let i = 0; i < list_x.length; i++)
                {
                    if(list_x[i] == foodX && list_y[i] == foodY)
                    {
                        invalid = true
                        break
                    }
                }
                if(!invalid)
                    break
            }
            led.plot(foodX, foodY)
        } else {
            let oldx = list_x.pop()
            let oldy = list_y.pop()
            if(oldx != x || oldy != y)
                led.unplot(oldx, oldy)
        }
        for(let i = 0; i < 5; i++)
        {
            led.unplot(foodX, foodY)
            basic.pause(100)
            led.plot(foodX, foodY)
            basic.pause(100)
        }
    }
})
