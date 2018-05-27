let init = {
    context: new AudioContext(),
    oscButton: document.querySelector("#osc"),
    waveSelect1: document.querySelector("#waveforms1"),
    waveSelect2: document.querySelector("#waveforms2"),
    waveSelect3: document.querySelector("#waveforms3"),
    volOsc1: document.querySelector("#vol_osc1"),
    volOsc2: document.querySelector("#vol_osc2"),
    volOsc3: document.querySelector("#vol_osc3"),
    detOsc1: document.querySelector("#det_osc1"),
    detOsc2: document.querySelector("#det_osc2"),
    detOsc3: document.querySelector("#det_osc3"),
};

class Synth {
    constructor(context, volAmpValues, detOscValues, typeOscValues) {
        this.context = context;
        this._volAmpValues = volAmpValues;
        this._detOscValues = detOscValues;
        this._typeOscValues = typeOscValues;
    }   
    setOscillators() {
        this.osc1 = this.context.createOscillator();
        this.osc2 = this.context.createOscillator();
        this.osc3 = this.context.createOscillator();
        this.applyWave(this._typeOscValues);
        this.applyDetune(this._detOscValues);
        this.applyAmp(this._volAmpValues);
    }
    set volAmpValues(values){
        this._volAmpValues = values;
    }
    set detOscValues(values) {
        this._detOscValues = values;
    }
    set typeOscValues(values) {
        this._typeOscValues = values;
    }
    applyAmp(volValues){
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
    applyWave(waveTypes){
        this.osc1.type = waveTypes[0];
        this.osc2.type = waveTypes[1];
        this.osc3.type = waveTypes[2];
    }
    applyDetune(detValues){
        this.osc1.detune.value = detValues[0];
        this.osc2.detune.value = detValues[1];
        this.osc3.detune.value = detValues[2];
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
let note = new Synth(init.context);
function playNote(){
    init.oscButton.addEventListener("pointerdown", function () {
        note.volAmpValues = [init.volOsc1.value, 
                            init.volOsc2.value,
                            init.volOsc3.value];
        note.detOscValues = [init.detOsc1.value,
                            init.detOsc2.value,
                            init.detOsc3.value,];
        note.typeOscValues = [init.waveSelect1.value,
                            init.waveSelect2.value,
                            init.waveSelect3.value];                            
        note.playOsc();
        init.oscButton.addEventListener("pointerup", function () {
            note.stopOsc();
        })
    })
}

playNote();


    
