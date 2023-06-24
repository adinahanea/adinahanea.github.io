
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';


			
			let particle=[];
			const particleCount=15000;

			var pointer = new THREE.Vector3();
			let copycam = new THREE.Vector3();

			let group, camera, scene, renderer, controls;
		
			init();
			animate();

			function init() {

				scene = new THREE.Scene();

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// camera

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 4000 );
				camera.position.set( 100, 70, 500 );
				scene.add( camera );

				// controls

				controls = new OrbitControls( camera, renderer.domElement );
				controls.listenToKeyEvents( window ); 

				controls.enableDamping = true; 
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;

				controls.minDistance = 100;
				controls.maxDistance = 1200;

				controls.maxPolarAngle = Math.PI / 2;;


				// helper

			//	scene.add( new THREE.AxesHelper( 200 ) );

				

				//group
				group = new THREE.Group();
				scene.add( group );

				//particles init

				const model =new THREE.SphereGeometry();
				const texture = new THREE.TextureLoader().load( 'water-texture.jpg' );
				const modelMaterial= new THREE.MeshBasicMaterial( { map: texture } );

				var lowItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
				var highItems =['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
				var nrItems = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				var symbolItems = ['@', '#', '$', '%', '^', '&', '_'];
				
				var items = lowItems.concat(highItems, nrItems, symbolItems);


				for(let i = 0; i<particleCount; i++) {
					const pX = Math.random() * 1000 - 500,
					pY = Math.random() * 1000 - 500,
					pZ = Math.random() * 1000 - 500;

					const rotx = Math.random() * 2 * Math.PI,
						roty = Math.random() * 2 * Math.PI,
						rotz = Math.random() * 2 * Math.PI;

					particle[i] = new THREE.Mesh(model, modelMaterial);
					particle[i].position.set(pX, pY, pZ);
					particle[i].rotation.set(rotx, roty, rotz);
					
					particle[i].userData = items[Math.floor(Math.random()*items.length)];
					particle[i].userKey=i;

					
					group.add(particle[i]);
				
				}

				
				//
				window.addEventListener( 'resize', onWindowResize );
				window.addEventListener('mousemove', onPointerMove );
				//
				document.getElementById('genBtn').addEventListener('click', copyRes);
				document.getElementById('anr').addEventListener('click', selectedNr);
				document.getElementById('apass').addEventListener('click', selectedPass);
				document.getElementById('customBtn').addEventListener('click', selectedcPass);
			//	document.getElementById('stopAnim').addEventListener('click', movement2);
			}
			//selection
			function selectedNr() {
				var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
				for(var i in particle) {
					particle[i].userData = items[Math.floor(Math.random()*items.length)];
					particle[i].userKey=i;
				}
			}
			function selectedPass() {
				
				var items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
				'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '@', '#', '$', '%', '^', '&', '_', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
				for(var i in particle) {
					particle[i].userData = items[Math.floor(Math.random()*items.length)];
					particle[i].userKey=i;
				}
			}

			function selectedcPass() {
				const checkboxes = document.querySelectorAll('input[name="checkPreferences"]:checked');
				var values = [];
				var items;
				checkboxes.forEach((checkbox) => {
					values.push(checkbox.id);
				});
				//alert(values);
				var lowItems = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
				var highItems =['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
				var nrItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
				var symbolItems = ['@', '#', '$', '%', '^', '&', '_'];


				if(values.toString()==="specialCharacters,nrs,letters,upCase") {
					selectedPass();
				}
				if(values.toString()==="specialCharacters,nrs,letters") {
					items = symbolItems.concat(nrItems, lowItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters,nrs,upCase") {
					items = symbolItems.concat(nrItems, highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters,letters,upCase") {
					items = symbolItems.concat(lowItems, highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="nrs,letters,upCase") {
					items = nrItems.concat(lowItems, highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters,nrs") {
					items = symbolItems.concat(nrItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters,letters") {
					items = symbolItems.concat(lowItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters,upCase") {
					items = symbolItems.concat(highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="nrs,letters") {
					items = nrItems.concat(lowItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="nrs,upCase") {
					items = nrItems.concat(highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="letters,upCase") {
					items = lowItems.concat(highItems);
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="specialCharacters") {
					items = symbolItems;
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="nrs") {
					items = nrItems;
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="letters") {
					items = lowItems;
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="upCase") {
					items = highItems;
					for(var i in particle) {
						particle[i].userData = items[Math.floor(Math.random()*items.length)];
						particle[i].userKey=i;
					}
				}
				if(values.toString()==="") {
					document.getElementById("what").innerHTML="You have to check AT LEAST 1 box in the list bellow!";
				}
				
			}

			function distance() {
				var min=15000;
				var part = [];
				var dist;

				copycam.x= camera.position.x;
				copycam.y= camera.position.y;
				copycam.z= camera.position.z;

				for(var i in particle) {
					
					dist= particle[i].position.distanceTo(copycam);
					if(dist < min) {
						min=dist;
						part.push(particle[i].userKey);
					}
				}
				var result="";
                var length = document.getElementById('resultLength').value;
				for(let i = 0; i<length; i++) {
					result+=particle[part.pop()].userData;

					if((i==0)&&(particle[part.pop()].userData==0)) {
						if(document.getElementById('anr').checked) {
							selectedNr();
						}
					}
				}
				return result;
			}
			
			async function copyRes() {
				document.getElementById("resultpop").style.display = "none";
				scene.updateMatrixWorld(true);
				var position = new THREE.Vector3();
				position.setFromMatrixPosition( particle[1].matrixWorld );

				var txt = distance();
				
				try{
					await navigator.clipboard.writeText(txt);
					document.getElementById("demo").innerHTML="Copied to clipboard!";
					document.getElementById("resultdemo").innerHTML=txt;
					
				}
				catch(err){
					alert("Copied to clipboard err: NOT copied ", err);
				}
				
			}

			function callRandomFunction(i) {
				var random = Math.floor(Math.random()*4);
				switch(random){
				case 0:
					particle[i].position.x +=Math.random()*100;
					break;
				case 1:
					particle[i].position.y+=Math.random()*100;
					break;
				case 2:
					particle[i].position.x-=Math.random()*100;
					break;
				case 3:
					particle[i].position.y-=Math.random()*100;
					break;
				}
			}

			function onPointerMove( event ) {
				event.preventDefault();
				pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
				pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

				if(document.getElementById('stopAnim').innerHTML=='Stop Animation') {
					mouseMove();
				}
				
			}

			function mouseMove() {
				var vector = new THREE.Vector3(pointer.x, pointer.y, 1);
				vector.unproject( camera );
				var dir = vector.sub( camera.position ).normalize();
				var distance = - camera.position.z / dir.z;
				var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
				
				for(var i in particle) {
					if(particle[i].position.distanceTo(pos)<=500) {
						callRandomFunction(i);
					}
				}
			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}		

			function movement1() {
				group.rotation.y -=0.007;
				group.rotation.x +=0.003;
				
			} 

			function movement2() {

				for(var i in particle) {
					particle[i].position.y -=10;
					if(particle[i].position.y <=-300) {
						particle[i].position.y = Math.random()*400;
					}
				}
				
			}

			function animate() { 

				requestAnimationFrame( animate );

				if(document.getElementById('stopAnim').innerHTML=='Stop Animation') {
					if(document.getElementById('newAnim').innerHTML=='New Animation') {
						movement1();
					}
					else {
						movement2();
					}
				}
				controls.update();

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

			

