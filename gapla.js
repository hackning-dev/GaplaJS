/**
 * This is GaplaJS v1.0
 * A framework discovered for performance by Hackning.
 * @version 1.0.0
 * @author  Hackning (Bishal Dey <bishaldey@hackning.com>)
 * @license LICENSE.md
 */

import { history } from 'backbone'
var dateFormat = require('dateformat');
var csso = require('csso');

class GaplaJS {
    Title(title){
        this.Select("title").innerHTML = `${title}`
    }
    Select(dom){
        var elm = document.querySelector(dom)
        return elm
    }
    SelectAll(dom){
        var elm = document.querySelectorAll(dom)
        return elm
    }
    InlineStyle(element, style){
        this.Select(element).style = style
    }
    Style(style){
        if (document.styleSheets.length > 1){
            this.Select("style").innerHTML += style
        }else{
            document.head.innerHTML += `<style rel="stylesheet" type="text/css"></style>`
            this.Select("style").innerHTML += style
        }
    }
    MinifyCSS(style){
        return csso.minify(style).css
    }
    Click(element, method){
        this.Select(element).onclick = method
    }
    AddClass(element, cls){
        this.Select(element).classList.add(cls)
    }
    RemoveClass(element, cls){
        this.Select(element).classList.remove(cls)
    }
    ContainClass(element, cls){
        return this.Select(element).classList.contains(cls)
    }
    Log(msg){
        console.log(msg)
    }
    Go(url){
        history.navigate(url, { trigger: true})
    }
    ChangeURL(url){
        window.history.replaceState("", "", url)
    }
    LoadDOM(element, template){
        this.Select(element).innerHTML = template
    }
    AppendDOM(element, template){
        this.Select(element).innerHTML += template
    }
    AppendDOMAtTop(element, template){
        this.Select(element).insertAdjacentHTML('afterbegin', template)
    }
    ClearDOM(element){
        this.LoadDOM(element, '')
    }
    RemoveDOM(element){
        this.Select(element).remove()
    }
    AppendDOMBeforeAt(element, template){
        this.Select(element).insertAdjacentHTML('beforebegin', template)
    }
    isEmptyDOM(element){
        if(!this.Select(element).innerHTML){
            return true
        }else{
            return false
        }
    }
    OnEvent(element, event, job){
        this.Select(element).addEventListener(event, job)
    }
    OnContentLoaded(task){
        document.addEventListener('DOMContentLoaded', task)
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validateMobileNumber(number) {
        var mob = /^[1-9]{1}[0-9]{9}$/

        if (mob.test(number) == false) {
            return false
        }else{
            return true
        }
    }
    YearNow(){
        var d = new Date()
        return d.getFullYear()
    }
    leftPad(number, targetLength) {
        var output = number + ''
        while (output.length < targetLength) {
            output = '0' + output
        }
        return output
    }
    convToTime(s){
        var min = Math.floor(s/60)
        var sec = s%60
        return `${this.leftPad(min,2)}:${this.leftPad(sec,2)}`
    }
    FormatDate(data, format){
        return dateFormat(data, format)
    }
    dataURItoBlob(dataURI, callback) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
    
        // write the ArrayBuffer to a blob, and you're done
        var bb = new Blob([ab], {type: 'image/png'});
        return bb;
    }
    GetRoute(){
        return history.getFragment()
    }
    dec2hex (dec) {
        return ('0' + dec.toString(16)).substr(-2)
    }
    generateId (len) {
        var arr = new Uint8Array((len || 40) / 2)
        window.crypto.getRandomValues(arr)
        return Array.from(arr, this.dec2hex).join('')
    }
    MakeRequest(url, options){
        return new Promise(resolve => {
            return fetch(url, options)
            .then(res => resolve(res.json()))
        })
    }
}

export const Gapla = new GaplaJS()