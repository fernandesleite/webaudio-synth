let init = {
    context: new AudioContext(),
    oscButton: document.querySelector("#osc"),
    waveSelect1: document.querySelector("#waveforms1"),
    waveSelect2: document.querySelector("#waveforms2"),
    waveSelect3: document.querySelector("#waveforms3"),
    volOsc1: document.querySelector("#vol_osc1"),
    volOsc2: document.querySelector("#vol_osc2"),
    volOsc3: document.querySelector("#vol_osc3")
};

class Synth {
    constructor(context, volAmpValues) {
        this.context = context;
        this._volAmpValues = volAmpValues;
    }   
    setOscillators() {
        this.osc1 = this.context.createOscillator();
        this.osc2 = this.context.createOscillator();
        this.osc3 = this.context.createOscillator();
        this.applyWave();
        this.setAmp(this._volAmpValues);
    }
    set volAmpValues(values){
        this._volAmpValues = values;
    }
    setAmp(volValues){
        this.amp1 = this.context.createGain();
        this.amp2 = this.context.createGain();
        this.amp3 = this.context.createGain();
        this.amp1.gain.setValueAtTime(volValues[0], this.context.currentTime);
        this.amp2.gain.setValueAtTime(volValues[1], this.context.currentTime);
        this.amp3.gain.setValueAtTime(volValues[2], this.context.currentTime);
        this.patchCables();
    }
    patchCables(){
        this.osc1.connect(this.amp1);
        this.osc2.connect(this.amp2);
        this.osc3.connect(this.amp3);
        this.amp1.connect(this.context.destination);
        this.amp2.connect(this.context.destination);
        this.amp3.connect(this.context.destination);
    }
    applyWave(){
        this.osc1.type = init.waveSelect1.value;
        this.osc2.type = init.waveSelect2.value;
        this.osc3.type = init.waveSelect3.value;
    }
    playOsc() {
        this.setOscillators()      
        this.osc1.start();
        this.osc2.start();
        this.osc3.start();
    }
    stopOsc() {
        this.osc1.stop();
        this.osc2.stop();
        this.osc3.stop();
    }
}

//Test Buttons Actions
function playNote(){
    let note = new Synth(init.context);
    init.oscButton.addEventListener("pointerdown", function () {
        note.volAmpValues = [init.volOsc1.value, init.volOsc2.value, init.volOsc3.value];
        note.playOsc();
        init.oscButton.addEventListener("pointerup", function () {
            note.stopOsc();
        })
    })
}

playNote();


    
