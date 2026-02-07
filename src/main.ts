// @ts-ignore
window.mod = window.mod || function() { };
import './style.css'
import { P5Renderer } from "./engine/drawingEngine"
import { Handler } from './engine/handler'
import p5 from 'p5'


const handler = new Handler()
const sketch = (p: p5) => {
	const ctx = new P5Renderer(p)
	p.setup = () => {
		p.createCanvas(800, 600)
	}
	p.draw = () => {
		handler.render(p.deltaTime)
		handler.draw(ctx)
	}
}
// const renderer = 
const p5js = new p5(sketch)


document.querySelector<HTMLBodyElement>('body')!.innerHTML = `<div></div>`
