 // Number of clouds
 var numTrees = 20;

 // Random position generation helper function
 function getRandomPosition(range) {
   return Math.random() * range - range / 2;
 }

 // Generate clouds
 for (var i = 0; i < numTrees; i++) {
   var tree = document.createElement("a-entity");
   tree.setAttribute("gltf-model", "#cloud-model");
   tree.setAttribute("position", {
     x: getRandomPosition(30),
     y: 400,
     z: getRandomPosition(30)
   });
   tree.setAttribute("scale", "1 1 1");
   tree.setAttribute("rotation", "0 " + Math.random() * 360 + " 0");
   tree.setAttribute("material", "color:blue");

   document.querySelector("a-mountain").appendChild(tree);
 }