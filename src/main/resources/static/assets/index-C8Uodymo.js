import{O as Y,i as ne,c as Z,a as F,A as I,b as X,r as Q,M as k,E as T,N as M,W,S as G,C as se,R as ie}from"./index-DBF5jzo-.js";import{Y as be,G as _e}from"./index-DBF5jzo-.js";const re=Symbol(),K=Object.getPrototypeOf,z=new WeakMap,oe=e=>e&&(z.has(e)?z.get(e):K(e)===Object.prototype||K(e)===Array.prototype),ce=e=>oe(e)&&e[re]||null,q=(e,t=!0)=>{z.set(e,t)},$={BASE_URL:"/",DEV:!1,MODE:"production",PROD:!0,SSR:!1,VITE_API_BASE:"",VITE_SUPABASE_PROJECT_ID:"nrfxnloqsmbelgqbnxnf",VITE_SUPABASE_PUBLISHABLE_KEY:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZnhubG9xc21iZWxncWJueG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MzYyMzYsImV4cCI6MjA5MjQxMjIzNn0.v3WgoWiUeb_i7sgBJSbnerZLtj8Pb6QCd0GUPDxwhiw",VITE_SUPABASE_URL:"https://nrfxnloqsmbelgqbnxnf.supabase.co"},V=e=>typeof e=="object"&&e!==null,_=new WeakMap,R=new WeakSet,ae=(e=Object.is,t=(i,S)=>new Proxy(i,S),n=i=>V(i)&&!R.has(i)&&(Array.isArray(i)||!(Symbol.iterator in i))&&!(i instanceof WeakMap)&&!(i instanceof WeakSet)&&!(i instanceof Error)&&!(i instanceof Number)&&!(i instanceof Date)&&!(i instanceof String)&&!(i instanceof RegExp)&&!(i instanceof ArrayBuffer),u=i=>{switch(i.status){case"fulfilled":return i.value;case"rejected":throw i.reason;default:throw i}},a=new WeakMap,c=(i,S,y=u)=>{const p=a.get(i);if((p==null?void 0:p[0])===S)return p[1];const h=Array.isArray(i)?[]:Object.create(Object.getPrototypeOf(i));return q(h,!0),a.set(i,[S,h]),Reflect.ownKeys(i).forEach(A=>{if(Object.getOwnPropertyDescriptor(h,A))return;const m=Reflect.get(i,A),b={value:m,enumerable:!0,configurable:!0};if(R.has(m))q(m,!1);else if(m instanceof Promise)delete b.value,b.get=()=>y(m);else if(_.has(m)){const[w,U]=_.get(m);b.value=c(w,U(),y)}Object.defineProperty(h,A,b)}),Object.preventExtensions(h)},l=new WeakMap,f=[1,1],N=i=>{if(!V(i))throw new Error("object required");const S=l.get(i);if(S)return S;let y=f[0];const p=new Set,h=(o,r=++f[0])=>{y!==r&&(y=r,p.forEach(s=>s(o,r)))};let A=f[1];const m=(o=++f[1])=>(A!==o&&!p.size&&(A=o,w.forEach(([r])=>{const s=r[1](o);s>y&&(y=s)})),y),b=o=>(r,s)=>{const d=[...r];d[1]=[o,...d[1]],h(d,s)},w=new Map,U=(o,r)=>{if(($?"production":void 0)!=="production"&&w.has(o))throw new Error("prop listener already exists");if(p.size){const s=r[3](b(o));w.set(o,[r,s])}else w.set(o,[r])},J=o=>{var r;const s=w.get(o);s&&(w.delete(o),(r=s[1])==null||r.call(s))},ee=o=>(p.add(o),p.size===1&&w.forEach(([s,d],E)=>{if(($?"production":void 0)!=="production"&&d)throw new Error("remove already exists");const O=s[3](b(E));w.set(E,[s,O])}),()=>{p.delete(o),p.size===0&&w.forEach(([s,d],E)=>{d&&(d(),w.set(E,[s]))})}),L=Array.isArray(i)?[]:Object.create(Object.getPrototypeOf(i)),P=t(L,{deleteProperty(o,r){const s=Reflect.get(o,r);J(r);const d=Reflect.deleteProperty(o,r);return d&&h(["delete",[r],s]),d},set(o,r,s,d){const E=Reflect.has(o,r),O=Reflect.get(o,r,d);if(E&&(e(O,s)||l.has(s)&&e(O,l.get(s))))return!0;J(r),V(s)&&(s=ce(s)||s);let x=s;if(s instanceof Promise)s.then(C=>{s.status="fulfilled",s.value=C,h(["resolve",[r],C])}).catch(C=>{s.status="rejected",s.reason=C,h(["reject",[r],C])});else{!_.has(s)&&n(s)&&(x=N(s));const C=!R.has(x)&&_.get(x);C&&U(r,C)}return Reflect.set(o,r,x,d),h(["set",[r],s,O]),!0}});l.set(i,P);const te=[L,m,c,ee];return _.set(P,te),Reflect.ownKeys(i).forEach(o=>{const r=Object.getOwnPropertyDescriptor(i,o);"value"in r&&(P[o]=i[o],delete r.value,delete r.writable),Object.defineProperty(L,o,r)}),P})=>[N,_,R,e,t,n,u,a,c,l,f],[le]=ae();function ue(e={}){return le(e)}function H(e,t,n){const u=_.get(e);($?"production":void 0)!=="production"&&!u&&console.warn("Please use proxy object");let a;const c=[],l=u[3];let f=!1;const i=l(S=>{c.push(S),a||(a=Promise.resolve().then(()=>{a=void 0,f&&t(c.splice(0))}))});return f=!0,()=>{f=!1,i()}}function fe(e){return R.add(e),e}function de(e,t,n,u){let a=e[t];return H(e,()=>{const c=e[t];Object.is(a,c)||n(a=c)})}const g=ue({status:"uninitialized"}),v={state:g,subscribeKey(e,t){return de(g,e,t)},subscribe(e){return H(g,()=>e(g))},_getClient(){if(!g._client)throw new Error("SIWEController client not set");return g._client},async getNonce(e){const n=await this._getClient().getNonce(e);return this.setNonce(n),n},async getSession(){try{const t=await this._getClient().getSession();return t&&(this.setSession(t),this.setStatus("success")),t}catch{return}},createMessage(e){const n=this._getClient().createMessage(e);return this.setMessage(n),n},async verifyMessage(e){return await this._getClient().verifyMessage(e)},async signIn(){return await this._getClient().signIn()},async signOut(){var t;const e=this._getClient();await e.signOut(),this.setStatus("ready"),this.setSession(void 0),(t=e.onSignOut)==null||t.call(e)},onSignIn(e){var n;const t=this._getClient();(n=t.onSignIn)==null||n.call(t,e)},onSignOut(){var t;const e=this._getClient();(t=e.onSignOut)==null||t.call(e)},setSIWEClient(e){g._client=fe(e),g.status="ready",Y.setIsSiweEnabled(e.options.enabled)},setNonce(e){g.nonce=e},setStatus(e){g.status=e},setMessage(e){g.message=e},setSession(e){g.session=e,g.status=e?"success":"ready"}},ge=ne`
  :host {
    display: flex;
    justify-content: center;
    gap: var(--wui-spacing-2xl);
  }

  wui-visual-thumbnail:nth-child(1) {
    z-index: 1;
  }
`;var we=function(e,t,n,u){var a=arguments.length,c=a<3?t:u===null?u=Object.getOwnPropertyDescriptor(t,n):u,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,n,u);else for(var f=e.length-1;f>=0;f--)(l=e[f])&&(c=(a<3?l(c):a>3?l(t,n,c):l(t,n))||c);return a>3&&c&&Object.defineProperty(t,n,c),c};let D=class extends F{constructor(){var t,n;super(...arguments),this.dappImageUrl=(t=Y.state.metadata)==null?void 0:t.icons,this.walletImageUrl=(n=I.state.connectedWalletInfo)==null?void 0:n.icon}firstUpdated(){var n;const t=(n=this.shadowRoot)==null?void 0:n.querySelectorAll("wui-visual-thumbnail");t!=null&&t[0]&&this.createAnimation(t[0],"translate(18px)"),t!=null&&t[1]&&this.createAnimation(t[1],"translate(-18px)")}render(){var t;return X`
      <wui-visual-thumbnail
        ?borderRadiusFull=${!0}
        .imageSrc=${(t=this.dappImageUrl)==null?void 0:t[0]}
      ></wui-visual-thumbnail>
      <wui-visual-thumbnail .imageSrc=${this.walletImageUrl}></wui-visual-thumbnail>
    `}createAnimation(t,n){t.animate([{transform:"translateX(0px)"},{transform:n}],{duration:1600,easing:"cubic-bezier(0.56, 0, 0.48, 1)",direction:"alternate",iterations:1/0})}};D.styles=ge;D=we([Z("w3m-connecting-siwe")],D);var B=function(e,t,n,u){var a=arguments.length,c=a<3?t:u===null?u=Object.getOwnPropertyDescriptor(t,n):u,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")c=Reflect.decorate(e,t,n,u);else for(var f=e.length-1;f>=0;f--)(l=e[f])&&(c=(a<3?l(c):a>3?l(t,n,c):l(t,n))||c);return a>3&&c&&Object.defineProperty(t,n,c),c};let j=class extends F{constructor(){var t;super(...arguments),this.dappName=(t=Y.state.metadata)==null?void 0:t.name,this.isSigning=!1,this.isCancelling=!1}render(){return this.onRender(),X`
      <wui-flex justifyContent="center" .padding=${["2xl","0","xxl","0"]}>
        <w3m-connecting-siwe></w3m-connecting-siwe>
      </wui-flex>
      <wui-flex
        .padding=${["0","4xl","l","4xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="paragraph-500" align="center" color="fg-100"
          >${this.dappName??"Dapp"} needs to connect to your wallet</wui-text
        >
      </wui-flex>
      <wui-flex
        .padding=${["0","3xl","l","3xl"]}
        gap="s"
        justifyContent="space-between"
      >
        <wui-text variant="small-400" align="center" color="fg-200"
          >Sign this message to prove you own this wallet and proceed. Canceling will disconnect
          you.</wui-text
        >
      </wui-flex>
      <wui-flex .padding=${["l","xl","xl","xl"]} gap="s" justifyContent="space-between">
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="neutral"
          ?loading=${this.isCancelling}
          @click=${this.onCancel.bind(this)}
          data-testid="w3m-connecting-siwe-cancel"
        >
          Cancel
        </wui-button>
        <wui-button
          size="lg"
          borderRadius="xs"
          fullWidth
          variant="main"
          @click=${this.onSign.bind(this)}
          ?loading=${this.isSigning}
          data-testid="w3m-connecting-siwe-sign"
        >
          ${this.isSigning?"Signing...":"Sign"}
        </wui-button>
      </wui-flex>
    `}onRender(){v.state.session&&k.close()}async onSign(){var t,n,u;this.isSigning=!0,T.sendEvent({event:"CLICK_SIGN_SIWE_MESSAGE",type:"track",properties:{network:((t=M.state.caipNetwork)==null?void 0:t.id)||"",isSmartAccount:I.state.preferredAccountType===W.ACCOUNT_TYPES.SMART_ACCOUNT}});try{v.setStatus("loading");const a=await v.signIn();return v.setStatus("success"),T.sendEvent({event:"SIWE_AUTH_SUCCESS",type:"track",properties:{network:((n=M.state.caipNetwork)==null?void 0:n.id)||"",isSmartAccount:I.state.preferredAccountType===W.ACCOUNT_TYPES.SMART_ACCOUNT}}),a}catch{const l=I.state.preferredAccountType===W.ACCOUNT_TYPES.SMART_ACCOUNT;return l?G.showError("This application might not support Smart Accounts"):G.showError("Signature declined"),v.setStatus("error"),T.sendEvent({event:"SIWE_AUTH_ERROR",type:"track",properties:{network:((u=M.state.caipNetwork)==null?void 0:u.id)||"",isSmartAccount:l}})}finally{this.isSigning=!1}}async onCancel(){var n;this.isCancelling=!0,I.state.isConnected?(await se.disconnect(),k.close()):ie.push("Connect"),this.isCancelling=!1,T.sendEvent({event:"CLICK_CANCEL_SIWE",type:"track",properties:{network:((n=M.state.caipNetwork)==null?void 0:n.id)||"",isSmartAccount:I.state.preferredAccountType===W.ACCOUNT_TYPES.SMART_ACCOUNT}})}};B([Q()],j.prototype,"isSigning",void 0);B([Q()],j.prototype,"isCancelling",void 0);j=B([Z("w3m-connecting-siwe-view")],j);export{v as SIWEController,D as W3mConnectingSiwe,j as W3mConnectingSiweView,be as getDidAddress,_e as getDidChainId};
