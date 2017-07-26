/**
 * Created by maxime on 26/07/17.
 */

import React, { Component } from 'react'
import { Scene, registerHandler, removeHandler } from 'react-babylonjs'
import { ArcRotateCamera, Vector3 } from 'babylonjs'
import * as BABYLON from 'babylonjs'

export default class Quarto extends Component {
	
	constructor(props) {
		super(props)
		
		// methods used by Scene (more will be added soon and documentation)
		this.onSceneMount = this.onSceneMount.bind(this)
		this.onMeshPicked = this.onMeshPicked.bind(this)
		
		// these action creators are exported from
	}
	
	onMeshPicked(mesh, scene) {
		// This will be called when a mesh is picked in the canvas
	}
	
	onSceneMount(e) {
		const { canvas, scene, engine} = e
		// Scene to build your environment, Canvas you need to attach your camera.
		const camera = new ArcRotateCamera("Camera", 0, 5, -10, Vector3.Zero(), scene)
		camera.attachControl(canvas, true)
		camera.setTarget(BABYLON.Vector3.Zero());
		// if you want to use a shader, pass in the directory to the component.
		const shader = new BABYLON.ShaderMaterial("gradient", scene, "gradient", {})
		
		const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
		
		
		let sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
		sphere.position.y = 1;
		window.addEventListener('keydown', (event) => {
			console.log(event.keyCode)
			if (event.keyCode === 38)
				BABYLON.Animation.CreateAndStartAnimation('boxscale', sphere, 'scaling.x', 60, 120, 1.0, 1.5)
		})
		var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
			}
		});
	}
	
	componentDidMount () {
		
		// you can add listeners to redux actions - they are intercepted by the middleware
		let handlers = {
			['YOUR_ACTION_TYPE']: (action) => {
				// run any code here - ie: set state that you monitor in your scene.registerBeforeRender(()=> { ... })
				// change properties or animate meshes.
				return true
			},
			['YOUR_ACTION_TYPE2']: (action) => {
				return true // indicates to middleware that it was handled
			}
		}
		
		this.actionHandler = (action) => {
			let handler = handlers[action.type]
			if (handler == undefined) {
				console.log(`no handler defined in babylonJS scene for ${action.type}`)
			} else {
				return handler(action)
			}
		}
		
		registerHandler(this.actionHandler)
	}
	
	componentWillUnmount() {
		this.scene = null
		removeHandler(this.actionHandler)
	}
	
	render() {
		
		const { appState } = this.props
		
		return (
			<div>
				<Scene
					onSceneMount={this.onSceneMount}
					onMeshPicked={this.onMeshPicked}
					shadersRepository={'/shaders/'}
					visible={appState.show3D} />
			</div>
		)
	}
}