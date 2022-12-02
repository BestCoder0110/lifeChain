const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png","robots.txt","svelte-welcome.png","svelte-welcome.webp"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".webp":"image/webp"},
	_: {
		entry: {"file":"_app/immutable/start-f808934b.js","imports":["_app/immutable/start-f808934b.js","_app/immutable/chunks/index-5b9f5232.js","_app/immutable/chunks/index-d30e7481.js","_app/immutable/chunks/singletons-eca981c1.js"],"stylesheets":[]},
		nodes: [
			() => import('./chunks/0-9e49015d.js'),
			() => import('./chunks/1-1c85f52f.js'),
			() => import('./chunks/5-6e5a7478.js'),
			() => import('./chunks/4-8b17ad41.js'),
			() => import('./chunks/2-979928bb.js'),
			() => import('./chunks/6-a40fe71d.js')
		],
		routes: [
			{
				type: 'page',
				id: "",
				pattern: /^\/$/,
				names: [],
				types: [],
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				id: "auth",
				pattern: /^\/auth\/?$/,
				names: [],
				types: [],
				path: "/auth",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				id: "todos",
				pattern: /^\/todos\/?$/,
				names: [],
				types: [],
				path: "/todos",
				shadow: null,
				a: [0,4,5],
				b: [1]
			},
			{
				type: 'endpoint',
				id: "api/auth/user",
				pattern: /^\/api\/auth\/user\/?$/,
				names: [],
				types: [],
				load: () => import('./chunks/user.ts-9a148136.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/logout",
				pattern: /^\/api\/auth\/logout\/?$/,
				names: [],
				types: [],
				load: () => import('./chunks/logout.ts-124698b3.js')
			},
			{
				type: 'endpoint',
				id: "api/auth/login",
				pattern: /^\/api\/auth\/login\/?$/,
				names: [],
				types: [],
				load: () => import('./chunks/login.ts-0afe987b.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export { manifest };
//# sourceMappingURL=manifest.js.map
