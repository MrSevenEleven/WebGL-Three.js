// 运行组件：
// var renderer,camera,scene,light,object
// scene.add(xxx);将各组件添加到场景中
// renderer.render(scene,camera);浏览器渲染，必须持续执行
// requestAnimationFrame(animation);游戏循环，自调用持续执行渲染render


// 相机位置参数
function  initCamera() {
    camera=new THREE.PerspectiveCamera(45,width/height,1,10000);
    camera.position.x=0;//相机防止位置(类似头的位置)
    camera.position.y=1000;
    camera.position.z=0;
    camera.up.x=0;//相机顶部朝向（类似头顶朝向）
    camera.up.y=0;
    camera.up.z=1;
    camera.lookAt(0,0,0);//相机镜头朝向（类似眼睛朝向）
}


// 相机分类：正投影相机THREE.OrthographicCamera和透视投影相机THREE.PerspectiveCamera
// OrthographicCamera( left, right, top, bottom, near, far )
// PerspectiveCamera( fov, aspect, near, far )视角fov，范围0-180度，视角越大物体越小（取景越广）；宽高比aspect；近平面；远平面
var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
scene.add( camera );
var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 );
scene.add( camera );
// 参数确定视景体


// 性能检测器 fps：帧数/时间  MS：时间/帧数
// 引入stats.js
stats=new Stats();
stats.domElement.style.position="absolute";
stats.domElement.style.left="0px";
stats.domElement.style.top="0px";
document.getElementById("canvas-frame").appendChild(stats.domElement);

stats.update();//游戏循环中持续执行


// 创建动画的方式：变化相机camera的位置和变化物体object的位置
// 动画插件 tween.js
// 游戏循环中执行 TWEEN.update();