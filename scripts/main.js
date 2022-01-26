//script
var check_view = false;
let view_item, scene, camera, renderer, points_info, starGeo, stars;
$(document).ready(function(){
  $(".item-list li").click(function(){
	if (check_view) { return};
	$("overlay").show();
	$("deslt").show();
    view_item = "#cpn_" + $(this).attr("pos");
	$(view_item).show();
	check_view = true;
	
	//$("#cpn_1").css("display","block");
	console.log("haha");
  });
  
  $(".closebtn").click(function(){
	 $("deslt").hide();
	 $(view_item).hide();
	 $("overlay").hide();
	 check_view = false;
  });
});
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;
	camera.rotation.x = Math.PI/2;
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	$("#mainscreen").append( renderer.domElement );
	
	
	let points = [];
	points_info= [];
	for(let i=0; i<5000; i++) {
		let star = new THREE.Vector3(
			Math.random() * 600 -300,
			Math.random() * 600 -300,
			Math.random() * 600 -300
		);
		var info={};
		info.velocity = 0;
		info.acceleration = 0.005;
		points.push(star);
		points_info.push(info);
	}
	starGeo = new THREE.BufferGeometry().setFromPoints(points);
	
	let sprite = new THREE.TextureLoader().load( '../images/star2.png' );
	let starMaterial = new THREE.PointsMaterial({
	  color: 0xaaaaaa,
	  size: 0.7,
	  map: sprite
	});
	
	stars = new THREE.Points(starGeo,starMaterial);
	scene.add(stars);
	
	
	//let geometry = new THREE.PlaneGeometry(1,window.innerHeight/window.innerWidth,1,1);
	//material = new THREE.shaderMaterial()
	//let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	//let plane = new THREE.Mesh( geometry, material );
	

	function animate() {
		const points = starGeo.attributes.position.array;
		for (let i = 0; i < points.length; i += 3) {
			points_info[i/3].velocity += points_info[i/3].acceleration;
			points[i+1] -= points_info[i/3].velocity;
			if(points[i+1] < -200) {
				points[i+1] = 200;
				points_info[i/3].velocity = 0;
			}
		}
		/*starGeo.vertices.forEach(p=>{
			p.velocity += p.acceleration;
			p.y -= p.velocity;
			if(p.y < -200) {
				p.y = 200;
				p.velocity = 0;
			}
		});*/
		
		starGeo.attributes.position.needsUpdate = true;
		stars.rotation.y +=0.002;
		requestAnimationFrame(animate);
		//plane.rotation.x += 0.01;
		//plane.rotation.y += 0.01;
		renderer.render(scene, camera);
	};
	animate();