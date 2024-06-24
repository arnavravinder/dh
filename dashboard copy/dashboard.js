var modal = document.getElementById("myModal");

var btn = document.getElementById("modalBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "flex";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.addEventListener('DOMContentLoaded', function () {


  var firebaseConfig = {
//hidden
};

      firebase.initializeApp(firebaseConfig);
  
      var modal = document.getElementById("myModal");
      var modalContent = document.querySelector(".modal-content-content");
      var uploadImgBtn = document.querySelector(".uploadImgBtn");
      var itemNameInput = document.querySelector(".itemName");
      var itemAgeInput = document.querySelector(".itemAge");
      var itemTypeSelect = document.querySelector("#item-type");
      var extraInformationInput = document.querySelector(".extraInformation");
      var uploadBtn = document.querySelector(".uploadBtn");
      var openModalBtn = document.getElementById("modalBtn");
      var closeBtn = document.querySelector(".close");
      var imageFileInput = document.createElement("input");
  
      var isImageUploaded = false;
  
      imageFileInput.type = "file";
      imageFileInput.style.display = "none";
      imageFileInput.accept = "image/*";
      modalContent.appendChild(imageFileInput);
  
      openModalBtn.addEventListener("click", function () {
          modal.style.display = "block";
      });
  
      closeBtn.addEventListener("click", function () {
          modal.style.display = "none";
          resetForm();
      });
  
      window.addEventListener("click", function (event) {
          if (event.target == modal) {
              modal.style.display = "none";
              resetForm();
          }
      });
  
      uploadImgBtn.addEventListener("click", function () {
          if (!itemNameInput.value || !itemAgeInput.value || !itemTypeSelect.value || !extraInformationInput.value) {
              alert("Please fill in all fields before uploading an image.");
              return;
          }
          imageFileInput.click();
      });
  
      imageFileInput.addEventListener("change", function () {
          var file = imageFileInput.files[0];
          if (file) {
              var storageRef = firebase.storage().ref('images/' + file.name);
  
              storageRef.put(file).then(function (snapshot) {
                  snapshot.ref.getDownloadURL().then(function (downloadURL) {
                      isImageUploaded = true;
  
                      if (isImageUploaded) {
                          var database = firebase.database();
                          var newItemRef = database.ref('items').push();
  
                          newItemRef.set({
                              itemName: itemNameInput.value,
                              itemAge: itemAgeInput.value,
                              itemType: itemTypeSelect.value,
                              extraInformation: extraInformationInput.value,
                              imageUrl: downloadURL
                          });
  
                          alert("Item uploaded successfully!");
                          modal.style.display = "none";
                          resetForm();
                      }
                  }).catch(function (error) {
                      console.error("Image upload error:", error);
                  });
              }).catch(function (error) {
                  console.error("Image upload error:", error);
              });
          }
      });
  
      function resetForm() {
          isImageUploaded = false;
          itemNameInput.value = "";
          itemAgeInput.value = "";
          itemTypeSelect.value = "";
          extraInformationInput.value = "";
          imageFileInput.value = "";
      }
  });


  const menu = document.querySelector(".hamburgerMenu");
  const items = document.querySelector(".otherItems");
  let active = false;
  
  window.addEventListener('resize', () => {
      if(window.innerWidth >= 600) {
          items.style.height = "100%";
      } else {
          active = false;
          checkMenu();
      }
  });
  
  function checkMenu() {
      if(active == false) {
          items.style.height = `${items.childNodes.length * 25}px`;
          active = true;
          document.querySelector(".line:nth-child(1)").style.transform = "translateY(400%) rotate(45deg)";
          document.querySelector(".line:last-child").style.transform = "translateY(-300%) rotate(-45deg)";
          document.querySelector(".line:nth-child(2)").style.transform = "scale(0, 1)";
      } else {
          items.style.height = "0";
          active = false;
          document.querySelector(".line:nth-child(1)").style.transform = "";
          document.querySelector(".line:last-child").style.transform = "";
          document.querySelector(".line:nth-child(2)").style.transform = "scale(1, 1)";
      }
  }
  
  menu.addEventListener("click", () => {
      checkMenu()
  });
  
  window.addEventListener("click", (e) => {
      if (active && !items.contains(e.target) && e.target !== document.querySelector(".line") && e.target !== menu) {
          checkMenu()
      }
  });