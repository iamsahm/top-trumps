(()=>{var e={881:e=>{e.exports=class{constructor(e,t=0,a=0,n=0,i=0,o=0,s=0,r=""){if("string"!=typeof e)throw new Error("Name must be a string");this.name=e,this.syntax=t,this.performance=a,this.portability=n,this.community=i,this.longevity=o,this.ecosystem=s,this.fact=r}}},417:(e,t,a)=>{const n=a(973),i=a(881);e.exports=class{constructor(){this.deck=[],this.players=[],this.gameOver=!1,this.leadPlayer=null,this.roundAttribute=null,this.pot=[]}addPlayer(e){"object"!=typeof e||this.players.includes(e)||this.players.push(e)}setLeadPlayer(e){this.leadPlayer=e}setRoundAttribute(e){this.roundAttribute=e}start(){this.populateDeck(),this.shuffle(),this.deal(),this.setLeadPlayer(this.players[0].name)}deal(){const e=Math.floor(this.deck.length/this.players.length);this.players.forEach((t=>{t.hand=this.deck.splice(0,e)}))}shuffle(){for(let e=this.deck.length-1;e>0;e--){const t=Math.floor(Math.random()*e);[this.deck[e],this.deck[t]]=[this.deck[t],this.deck[e]]}}populateDeck(){this.deck=n.map((({name:e,syntax:t,performance:a,portability:n,community:o,longevity:s,ecosystem:r,fact:l})=>new i(e,t,a,n,o,s,r,l)))}isGameOver(){const e=this.players.filter((e=>e.hand.length>0)).length;return this.gameOver=e<2,this.gameOver}playCard(e,t){const a=this.players[e].hand.splice(t,1)[0];this.pot.push(a)}roundWinner(e,...t){return console.log(t,"turns"),t.map((t=>{const[a,n]=t;return[a,n[e]]})).reduce(((e,t)=>t[1]>e[1]?t:e))[0]}reset(){this.deck=[],this.players=[],this.gameOver=!1,this.leadPlayer=null}assignWinnings(e){this.players[e].hand=[...this.players[e].hand,...this.pot],this.pot=[]}}},973:e=>{"use strict";e.exports=JSON.parse('[{"name":"Python","syntax":70,"performance":80,"portability":40,"community":40,"longevity":60,"ecosystem":70,"fact":"Python was invented by a man"},{"name":"Javascript","syntax":70,"performance":30,"portability":80,"community":80,"longevity":70,"ecosystem":70,"fact":"Javascript was written in two weeks"},{"name":"Java","syntax":60,"performance":70,"portability":90,"community":80,"longevity":80,"ecosystem":90,"fact":"Java was originally designed for interactive television"},{"name":"C++","syntax":50,"performance":90,"portability":70,"community":70,"longevity":90,"ecosystem":80,"fact":"C++ was developed by Bjarne Stroustrup at Bell Labs"},{"name":"Ruby","syntax":80,"performance":60,"portability":70,"community":70,"longevity":70,"ecosystem":80,"fact":"Ruby was influenced by Perl, Smalltalk, Eiffel, Ada, and Lisp"},{"name":"Swift","syntax":80,"performance":80,"portability":70,"community":70,"longevity":60,"ecosystem":70,"fact":"Swift was developed by Apple for iOS and Mac apps"},{"name":"Go","syntax":70,"performance":90,"portability":80,"community":70,"longevity":60,"ecosystem":70,"fact":"Go was developed at Google in response to the company\'s problems with concurrent programming"},{"name":"Rust","syntax":70,"performance":90,"portability":80,"community":70,"longevity":60,"ecosystem":70,"fact":"Rust is designed to be memory safe without garbage collection"},{"name":"Kotlin","syntax":80,"performance":70,"portability":80,"community":70,"longevity":60,"ecosystem":70,"fact":"Kotlin is officially supported by Google for Android development"},{"name":"TypeScript","syntax":80,"performance":70,"portability":80,"community":80,"longevity":70,"ecosystem":80,"fact":"TypeScript is a strict syntactical superset of JavaScript"},{"name":"Scala","syntax":70,"performance":80,"portability":70,"community":70,"longevity":70,"ecosystem":70,"fact":"Scala is designed to express common programming patterns in a concise, elegant, and type-safe way"},{"name":"Perl","syntax":60,"performance":70,"portability":80,"community":70,"longevity":80,"ecosystem":70,"fact":"Perl was originally developed for text manipulation"},{"name":"PHP","syntax":60,"performance":70,"portability":80,"community":80,"longevity":80,"ecosystem":80,"fact":"PHP originally stood for \'Personal Home Page\'"},{"name":"Lua","syntax":80,"performance":70,"portability":90,"community":60,"longevity":70,"ecosystem":60,"fact":"Lua is commonly used in game development"},{"name":"R","syntax":70,"performance":60,"portability":70,"community":80,"longevity":70,"ecosystem":90,"fact":"R is widely used for statistical computing and graphics"},{"name":"Elixir","syntax":70,"performance":80,"portability":70,"community":60,"longevity":60,"ecosystem":70,"fact":"Elixir is a dynamic, functional language designed for building scalable and maintainable applications"},{"name":"Haskell","syntax":60,"performance":80,"portability":70,"community":60,"longevity":70,"ecosystem":60,"fact":"Haskell is a statically typed, purely functional programming language"},{"name":"Groovy","syntax":70,"performance":60,"portability":70,"community":60,"longevity":60,"ecosystem":70,"fact":"Groovy is a powerful, optionally typed and dynamic language, with static-typing and static compilation capabilities"},{"name":"Clojure","syntax":70,"performance":70,"portability":80,"community":60,"longevity":60,"ecosystem":70,"fact":"Clojure is a robust, practical, and fast programming language with a set of useful features that together form a simple, coherent, and powerful tool"},{"name":"Erlang","syntax":60,"performance":80,"portability":70,"community":60,"longevity":70,"ecosystem":70,"fact":"Erlang is a programming language used to build massively scalable soft real-time systems with requirements on high availability"},{"name":"F#","syntax":70,"performance":70,"portability":70,"community":60,"longevity":60,"ecosystem":70,"fact":"F# is a mature, open source, cross-platform, functional-first programming language"},{"name":"Dart","syntax":70,"performance":70,"portability":80,"community":60,"longevity":60,"ecosystem":70,"fact":"Dart is a client-optimized language for fast apps on any platform"},{"name":"Objective-C","syntax":60,"performance":70,"portability":60,"community":60,"longevity":70,"ecosystem":70,"fact":"Objective-C was the main programming language used by Apple for macOS and iOS development before Swift"},{"name":"Shell","syntax":60,"performance":70,"portability":80,"community":70,"longevity":80,"ecosystem":70,"fact":"Shell scripting is used for automating routine tasks in Unix-like operating systems"},{"name":"MATLAB","syntax":70,"performance":60,"portability":70,"community":70,"longevity":70,"ecosystem":80,"fact":"MATLAB is widely used in academia and industry for mathematical modeling"},{"name":"Fortran","syntax":50,"performance":80,"portability":70,"community":60,"longevity":90,"ecosystem":60,"fact":"Fortran is one of the oldest high-level programming languages, first developed in the 1950s"},{"name":"COBOL","syntax":50,"performance":60,"portability":70,"community":60,"longevity":90,"ecosystem":60,"fact":"COBOL is widely used in legacy applications deployed on mainframe computers"},{"name":"Assembly","syntax":40,"performance":90,"portability":50,"community":50,"longevity":90,"ecosystem":60,"fact":"Assembly language is a low-level programming language for a computer, or other programmable device"},{"name":"Prolog","syntax":60,"performance":60,"portability":70,"community":60,"longevity":70,"ecosystem":60,"fact":"Prolog is a logic programming language associated with artificial intelligence and computational linguistics"},{"name":"Lisp","syntax":60,"performance":60,"portability":70,"community":60,"longevity":80,"ecosystem":60,"fact":"Lisp (for \'List Processing\') is one of the oldest high-level programming languages, first conceived in 1958"},{"name":"Ada","syntax":70,"performance":70,"portability":70,"community":60,"longevity":70,"ecosystem":60,"fact":"Ada is a structured, statically typed, imperative, and object-oriented high-level computer programming language"},{"name":"Julia","syntax":70,"performance":80,"portability":70,"community":60,"longevity":60,"ecosystem":70,"fact":"Julia is a high-level, high-performance dynamic programming language for technical computing"},{"name":"C#","syntax":70,"performance":80,"portability":70,"community":80,"longevity":70,"ecosystem":80,"fact":"C# is a modern, object-oriented programming language developed by Microsoft"}]')}},t={};function a(n){var i=t[n];if(void 0!==i)return i.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}(()=>{const e=a(417),t=document.getElementById("add-player-form"),n=document.getElementById("player-name"),i=new e;function o(){const e=document.getElementById("player-list");e.innerHTML="Player list:",i.players.forEach((t=>{const a=document.createElement("li");a.textContent=t.name,e.appendChild(a)}))}t.addEventListener("submit",(e=>{e.preventDefault();const t=n.value;t&&(i.addPlayer({name:t}),o(),n.value="",console.log(i))}));const s=document.getElementById("end-game-setup"),r=document.getElementById("game-setup");s.addEventListener("click",(()=>{i.start(),r.style.display="none",function(){if(i.isGameOver()){const e=i.players.find((e=>e.hand.length>0));document.getElementById("game-results").innerHTML=`<h2>${e.name} wins!</h2>`}else{!function(e){const t=document.getElementById("hand");t.innerHTML="";const a=e.hand[0],n=document.createElement("div");n.classList.add("card");for(let e=0;e<Object.keys(a).length;e++){const t=Object.keys(a)[e],i=document.createElement("p");i.textContent=`${t}: ${a[t]}`,n.appendChild(i)}t.appendChild(n)}(i.players.find((e=>e.name===i.leadPlayer))),function(){const e=document.getElementById("attribute-buttons");e.innerHTML="",Object.keys(i.players[0].hand[0]).slice(1,-1).forEach((t=>{const a=document.createElement("button");a.textContent=t,a.addEventListener("click",(()=>{i.setRoundAttribute(t)})),e.appendChild(a)}))}();for(let e=0;e<i.players.length;e++){const t=i.players[e];if(t.name!==i.leadPlayer){const e=t.hand[0],a=i.roundAttribute,n=document.createElement("p");n.textContent=`${t.name}: ${e[a]}`,document.getElementById("hand").appendChild(n)}}}}()})),document.getElementById("reset-game").addEventListener("click",(()=>{i.reset(),s.disabled=!1,t.disabled=!1,o(),document.getElementById("hand").innerHTML=""}))})()})();