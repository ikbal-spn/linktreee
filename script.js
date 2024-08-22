Vue.component("linkdrip-skin", {
	data: function () {
		return {
			linkdrip: this.$root.linkdrip,
			animate: false
		};
	},
	created: function () {
		var vue = this;
		setTimeout(()=>{
			this.startEmblem('[data-emblem]');
			this.startAnimations();
		}, 100 );
	},
	methods: {
		startAnimations: function(){
			this.animate = true;
		},
		startEmblem: function (el, str) {
			var element = document.querySelector(el);
			var text = str ? str : element.innerHTML;
			element.innerHTML = "";
			for (var i = 0; i < text.length; i++) {
				var letter = text[i];
				var span = document.createElement("span");
				var node = document.createTextNode(letter);
				var r = (360 / text.length) * i;
				var x = (Math.PI / text.length).toFixed(0) * i;
				var y = (Math.PI / text.length).toFixed(0) * i;
				span.appendChild(node);
				span.style.webkitTransform =
					"rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
				span.style.transform =
					"rotateZ(" + r + "deg) translate3d(" + x + "px," + y + "px,0)";
				element.appendChild(span);
			}
		}
	},
	template: 
		`<div data-container>
			<ul data-links :class="{ active: animate }">
				<li data-link-container v-for="link in linkdrip.links" v-if="link.label !== ''">
					<a data-link :href="link.url" target="_blank">
						<span data-button-bg></span>
						<span data-button-label v-text="link.label"></span>
					</a>
				</li>
			</ul>
			<div data-profile-container :class="{ active: animate }">
				<h1 data-username v-text="'@'+linkdrip.profile.name.text"></h1>
				<p data-description v-text="linkdrip.profile.description.text"></p>
			</div>
			<div data-avatar-container :class="{ active: animate }">
				<img data-avatar :src="linkdrip.profile.image" />
				<div data-emblem>
					<slot v-for="n in 3">{{linkdrip.profile.name.text+' &middot; '}}</slot>
				</div>
			</div>
		</div>`
});

new Vue({
	el: "#app",
	data: {
		search: new URLSearchParams(window.location.search),
		visible: false,
		linktree: false,
		linkdrip: {
			skin: "SKIN_NAME",
			profile: {
				image: "https://telegra.ph/file/59bd158bab8b2de8cb778.jpg", //"https://smhlancers.org/wp-content/uploads/2016/06/profile-placeholder-300x300.png",
				name: {
					text: "Ikbal spn"
				},
				description: {
					text: "Saya suka banget jalan-jalan, nyari pengalaman seru di tempat-tempat baru. Nggak cuma itu, saya juga hobi main bulu tangkis buat ngeluarin energi dan ngasah skill. Teknologi juga jadi passion utama saya, dan cita-cita saya adalah jadi programmer keren yang bisa bikin inovasi digital. Bagi saya, hidup itu soal terus belajar, eksplorasi, dan menikmati setiap momen yang ada."
				}
			},
			links: [
				{
					url: "https://ngl.link/astdm_al2",
					label: "ngl"
				},
				{
					url: "http://google.com",
					label: "Spotify"
				},
				{
					url: "http://wa.me/6283821115236",
					label: "WhatsApp"
				},
				{
					url: "http://Instagram.com/astdm_al",
					label: "Instagram"
				},
				{
					url: "http://facebook.com/",
					label: "Facebook"
				}
			]
		}
	}
});
