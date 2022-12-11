import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

    rotationSpeedX: number = 0.05;
    rotationSpeedY: number = 0.01;
    size: number = 200;
    cameraZ: number = 400;
    fieldOfView: number = 75;
    nearClippingPlane: number = 0.1;
    farClippingPlane: number = 100;
    texture: string = '/assets/background.jpg';

    modelLoader = new GLTFLoader();
    model: any;
    controls: any;

    camera!: THREE.PerspectiveCamera;

    @ViewChild('canvas')
    private canvasRef!: ElementRef;

    get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    loader = new THREE.TextureLoader();
    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshBasicMaterial({ color: 'green' });

    cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

    renderer!: THREE.WebGL1Renderer;
    scene!: THREE.Scene;

    light: any;

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        this.createScene();
        // this.startRenderingLoop();
    }

    createScene(): void {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xFFFFFF);

        // this.scene.add(this.cube);

        this.modelLoader.load('assets/suit.gltf', (gltf: GLTF) => {
            console.log(gltf)
            this.model = gltf.scene;
            this.model.scale.set(1, 1, 1);

            // console.log(this.model.getObjectByName('Trousers'))

            this.scene.add(gltf.scene);
            let colors: any = localStorage.getItem('colors');
            if (colors) {
                colors = JSON.parse(colors);
                console.log(colors)
                let shirtColor = '0x' + colors.shirt;
                let pantColor = '0x' + colors.pant;
                this.model.getObjectByName('Cube007_2').material.color.setHex(shirtColor);
                this.model.getObjectByName('Suit_Legs').material.color.setHex(pantColor);
            }

        });
        
        let aspectRatio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPlane,
            this.farClippingPlane
        );

        this.camera.position.set(0, 1, 2);
        this.scene.add(this.camera)

        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(0, 1, 2);
        this.scene.add(this.light);

        this.startRenderingLoop();
    }

    getAspectRatio(): any {
        return window.innerWidth / window.innerHeight;
    }

    startRenderingLoop(): void {
        this.renderer = new THREE.WebGL1Renderer({ canvas: this.canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        // this.renderer.render(this.scene, this.camera);

        const thisVariable = this;
        (function render () {
            requestAnimationFrame(render)
            thisVariable.renderer.render(thisVariable.scene, thisVariable.camera);
        })();
    }

}
