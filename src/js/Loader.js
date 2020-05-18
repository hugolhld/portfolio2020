export default class Loader
{
	constructor(options){

        this.assets = {}
        
        for(let asset of options.assets)
        {
			this.assets[asset] = { loaded:0, complete:false }
			this.load(asset)
        }
        
		this.container = options.container

		if (options.onprogress == undefined){
            this.onprogress = onprogress
            this.pourcentDiv = document.querySelector('.js-pourcent')
            this.pourcentBar = document.querySelector('.js-pourcent-bar')

            // if (this.container!=undefined)
            // {
            //     this.container.appendChild(this.domElement)
            // }
            // else
            // {
            //     document.body.appendChild(this.domElement)
			// }
        }
        else
        {
			this.onprogress = options.onprogress
		}

        this.oncomplete = options.oncomplete
        // const loader = this
        
        function onprogress(delta)
        {
            const progress = delta

            if( progress == isNaN ) this.pourcentDiv.innerText = '0 %'

            this.pourcentDiv.innerText = `${Math.floor(progress*100)} %`
            this.pourcentBar.style.transform = `scaleX(${progress / 100})`

            if (delta >= 1)
            {
                this.pourcentDiv.innerText = `100 %`
            }
            this.pourcentBar.style.transform = `scaleX(${progress / 100})`
		}
	}

	checkCompleted(){
        for(let prop in this.assets)
        {
			const asset = this.assets[prop]
			if (!asset.complete) return false
		}
		return true
	}

	get progress(){
		let total = 0
		let loaded = 0

        for(let prop in this.assets)
        {
			const asset = this.assets[prop]
            if (asset.total == undefined)
            {
				loaded = 0
				break
			}
			loaded += asset.loaded
			total += asset.total
		}

		return loaded/total
	}

	load(url){
		const loader = this
		var xobj = new XMLHttpRequest()
		xobj.overrideMimeType("application/json")
		xobj.open('GET', url, true)
		xobj.onreadystatechange = function () {
			  if (xobj.readyState == 4 && xobj.status == "200") {
				  loader.assets[url].complete = true
				  if (loader.checkCompleted()){
					  if (loader.domElement!=undefined){
						  if (loader.container!=undefined){
							  loader.container.removeChild(loader.domElement)
						  }else{
							  document.body.removeChild(loader.domElement)
                          }
					  }
					  loader.oncomplete()
				  }
			  }
		}
		xobj.onprogress = function(e){
			const asset = loader.assets[url]
			asset.loaded = e.loaded
			asset.total = e.total
			loader.onprogress(loader.progress)
		}
		xobj.send(null)
	}
}
