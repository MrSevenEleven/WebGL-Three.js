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


// 光源种类
// 环境光：var light = new THREE.AmbientLight( 0xff0000 );
        //环境光就是在场景中无处不在的光，它对物体的影响是均匀的，也就是无论你从物体的那个角度观察，物体的颜色都是一样的，这就是伟大的环境光。
        // 你可以把环境光放在任何一个位置，它的光线是不会衰减的，是永恒的某个强度的一种光源。
// 点光源：THREE.PointLight( color, intensity, distance )
//             Intensity：光的强度，默认是1.0,就是说是100%强度的灯光；
//             distance：光的距离，从光源所在的位置，经过distance这段距离之后，光的强度将从Intensity衰减为0。 默认情况下，这个值为0.0，表示光源强度不衰减。
// 聚光灯：THREE.SpotLight( hex, intensity, distance, angle, exponent )
//             Angle：聚光灯着色的角度，用弧度作为单位，这个角度是和光源的方向形成的角度
//             exponent：光源模型中，衰减的一个参数，越大衰减约快。
// 区域光：THREE.AreaLight();
// 方向光：light = new THREE.DirectionalLight(0xFF0000,1);第二个参数是光源强度
        // 平行光又称为方向光（Directional Light），是一组没有衰减的平行的光线，类似太阳光的效果。位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
        // 平行光有一个方向,方向由位置和原点（0,0,0）来决定，方向光只与方向有关，与离物体的远近无关。
// 当环境光和方向光同时存在的时候,可以把这种情况想成两种光源同时作用于物体，它产生的情况，和每种光源分别作用于物体，然后将两者的结果相加，是一样的效果。
// 环境光和方向光共同作用,其实是两种光源颜色的简单相加,0x00FF00 + 0xFF0000 = 0xFFFF00，oxFFFF00 就是黄色。


// 材质与光源的关系
// 在渲染程序中，它是表面各可视属性的结合，这些可视属性是指表面的色彩、纹理、光滑度、透明度、反射率、折射率、发光度等。正是有了这些属性，才能让我们识别三维中的模型是
// 什么做成的，也正是有了这些属性，我们计算机三维的虚拟世界才会和真实世界一样缤纷多彩。
// 结论：当没有任何光源的时候，最终的颜色将是黑色，无论材质是什么颜色。
// 最常见的材质之一就是Lambert材质，这是在灰暗的或不光滑的表面产生均匀散射而形成的材质类型。Lambert材质表面会在所有方向上均匀地散射灯光，这就会使颜色看上去比较均匀。
// Lambert材质会受环境光的影响，呈现环境光的颜色，与材质本身颜色关系不大。


// 纹理
// 加载一张图片作为纹理
// 3D世界的纹理由图片组成。将纹理以一定的规则映射到几何体上，一般是三角形上，那么这个几何体就有纹理皮肤了。
// 在threejs中，纹理类由THREE.Texture表示，其构造函数如下所示：
// THREE.Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
    // Image：这是一个图片类型，基本上它有ImageUtils来加载，如下代码
        // var image = THREE.ImageUtils.loadTexture(url); 新版本中THREE.ImageUtils.loadTexture已经由THREE.TextureLoader()替代：
        // var texture = new THREE.TextureLoader().load("url",function () {})
    // Mapping：是一个THREE.UVMapping()类型，它表示的是纹理坐标。
    // wrapS：表示x轴的纹理的回环方式，就是当纹理的宽度小于需要贴图的平面的宽度的时候，平面剩下的部分应该p以何种方式贴图的问题。
    // wrapT：表示y轴的纹理回环方式。
    // magFilter和minFilter表示过滤的方式
    // format：表示加载的图片的格式，这个参数可以取值THREE.RGBAFormat，RGBFormat等。THREE.RGBAFormat表示每个像素点要使用四个分量表示，分别是红、绿、蓝、透明来表示。
    // RGBFormat则不使用透明，也就是说纹理不会有透明的效果。
    // type：表示存储纹理的内存的每一个字节的格式，是有符号，还是没有符号，是整形，还是浮点型。默认是无符号型（THREE.UnsignedByteType）
    // anisotropy：各向异性过滤。使用各向异性过滤能够使纹理的效果更好，但是会消耗更多的内存、CPU、GPU时间
// 通过html中的canvas来作为纹理
    // texture = new THREE.Texture( canvas);
    // var material = new THREE.MeshBasicMaterial({map:texture});
    // 将texture.needsUpdate设置为了true，如果不设置为true，那么纹理就不会更新 .纹理的绘制是需要一段时间的，javascript是可以异步运行的，在canvas绘制出图形之前，
    // 可能three.js就开始根据纹理渲染图形了。如果纹理不更新，那么正方体一直会是以前没有绘制完成的纹理，很可能是材质本身的颜色。


// 3D模型加载与使用
// 模型是由面组成，面分为三角形和四边形面。三角形和四边形面组成了网格模型。在Three.js中用THREE.Mesh来表示网格模型。THREE.Mesh可以和THREE.Line相提并论，区
// 别是THREE.Line表示的是线条。THREE.Mesh表示面的集合
    // THREE.Mesh = function ( geometry, material )
        // geometry：是一个THREE.Geometry类型的对象,他是一个包含顶点和顶点之间连接关系的对象。
        // Material：就是定义的材质。有了材质就能够让模型更好看，材质会影响光照、纹理对Mesh的作用效果。
    // 模型加载到浏览器中的过程
    //     1、服务器上的模型文件以文本的方式存储；
    //     2、浏览器下载文件到本地；
    //     3、Javascript解析模型文件，生成Mesh网格模型；
    //     4、显示在场景中；
    //         1、服务器上的模型文件大多是存储的模型的顶点信息，这些信息可以以文本的方式存储的（并不一定需要用文本的方式存储）。Three.js支持很多种3D模型格式，例
    //         如ply，stl，obj，vtk等等
    //         2、第二步是浏览器下载文本文件，只需要使用javascript的异步请求就可以实现了。
    //         3、Javascript解析文本文件并生成一个geometry，最终生成Mesh。
    //         4、当产生Mesh后，将其加入到场景中。

    // 注：最新的three.js（r89）中，模型加载函数与中文网教材（r73）有差别，VTK加载方式如index7内，并且中文网示例中原写在VTKLoader.js末尾的四个计算重心等的函数
    //     已经没有了，需要自行在加载模型时调用，部分函数名有变化，如index7.js。其中不执行computeVertexNormals（）将导致模型加载不成功。

        // 参考文档：https://www.jianshu.com/p/9e2f2075d803   将不同格式的3d模型导入three.js