(()=>{"use strict";function e(){const t=document.querySelector(".add-project");document.createElement("input").placeholder="Project name",t.removeEventListener("click",e),function(){const e=document.querySelector(".add-project");e.classList.add("active"),e.innerHTML='<input placeholder="Project name">\n    <div class="confirmation">\n    <div class="confirm">Add</div>\n    <div class="cancel">Cancel</div>\n    </div>'}(),document.querySelector(".confirm"),document.querySelector(".cancel").addEventListener("click",c)}function c(){const c=document.querySelector(".add-project");c.classList.remove("active"),c.innerHTML='<i class="fas fa-plus" aria-hidden="true"></i>\n    <div class="add-text">Add project</div>',setTimeout((()=>c.addEventListener("click",e)),1)}!function(){const e=document.querySelectorAll(".default-timetables li");e.forEach((c=>{c.addEventListener("click",(()=>{e.forEach((e=>{e.classList.remove("active")})),c.className="active"}))}))}(),document.querySelector(".add-project").addEventListener("click",e)})();