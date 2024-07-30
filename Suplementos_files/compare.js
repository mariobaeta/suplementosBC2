const LOCAL_STORAGE_COMPARE_KEY="zmz-shopify-compare",LOCAL_STORAGE_COMPARE_SEPARATOR=",",BUTTON_COMPARE_ACTIVE_CLASS="compareIn",COMPARE_MAX_ITEM=6,selectorsCompare={buttonCompare:"[btn-compare-js]",removeItem:"[remove-item]"};let getCompareListBtn=document.getElementById("compare_list"),compareCounter=document.getElementById("compare__counter"),getCompareList=document.getElementById("compare"),getCompareWrapper=document.querySelector(".compare__wrapper"),createCompareItem=document.createElement("ul");createCompareItem.className="createCompareItem",document.addEventListener("DOMContentLoaded",()=>{initBtnCompare()}),document.addEventListener("zmz-shopify-compare:updated",event=>{initBtnCompareList()}),document.addEventListener("zmz-shopify-compare:init-buttons",event=>{initBtnCompareList()});const setBtnCompare=buttons=>{buttons.forEach(buttonCompare=>{const productHandle=buttonCompare.dataset.productHandle||!1;if(!productHandle)return console.error("[Shopify Compare] Missing `data-product-handle` attribute. Failed to update the compare.");compareContains(productHandle)&&buttonCompare.classList.add(BUTTON_COMPARE_ACTIVE_CLASS),buttonCompare.addEventListener("click",()=>{getCompare().length+1>6?(updCompare(productHandle),buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)):(updCompare(productHandle),buttonCompare.classList.toggle(BUTTON_COMPARE_ACTIVE_CLASS))})})},initBtnCompare=()=>{const buttons=document.querySelectorAll(selectorsCompare.buttonCompare)||[];if(buttons.length)setBtnCompare(buttons);else return;const event=new CustomEvent("zmz-shopify-compare:init-buttons",{detail:{compare:getCompare()}});document.dispatchEvent(event)},getCompare=()=>{const compare=localStorage.getItem(LOCAL_STORAGE_COMPARE_KEY)||!1;return compare?compare.split(LOCAL_STORAGE_COMPARE_SEPARATOR):[]},setCompare=array=>{const compare=array.join(LOCAL_STORAGE_COMPARE_SEPARATOR);array.length?localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY,compare):localStorage.removeItem(LOCAL_STORAGE_COMPARE_KEY);const event=new CustomEvent("zmz-shopify-compare:updated",{detail:{compare:array}});return document.dispatchEvent(event),compare},updCompare=handle=>{const compare=getCompare(),idxItemListCompare=compare.indexOf(handle);let compareLength=compare.length+1;return compareLength<=6&&(idxItemListCompare===-1?compare.push(handle):compare.splice(idxItemListCompare,1)),compareLength>6&&idxItemListCompare!==-1&&compare.splice(idxItemListCompare,1),compareLength>6&&idxItemListCompare===-1&&$.fancybox.open({content:`<div class="overInfo">${theme.strings.compareAlert}</div>`}),compareCounter.innerHTML=compare.length,setCompare(compare)},compareContains=handle=>getCompare().includes(handle),resetCompare=()=>{compareCounter.innerHTML="0",createCompareItem.innerHTML="",getCompareListBtn.style.display="none";const buttonsCompareArray=document.querySelectorAll(selectorsCompare.buttonCompare);return buttonsCompareArray.length&&buttonsCompareArray.forEach(buttonCompare=>{buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)}),$(getCompareList).fadeOut("slow"),setCompare([])},initBtnCompareList=()=>{const compare=getCompare();getCompareListBtn&&(compare.length<2?getCompareListBtn.style.display="none":compare.length>=2&&(getCompareListBtn.style.display="flex")),compareCounter.innerHTML=compare.length},removeProduct=el=>{const compare=getCompare();let elHandle=el.getAttribute("data-rem-handle"),newCompare=compare.filter(function(value){if(value!==elHandle)return value});const compareNewLocalStorage=newCompare.join(LOCAL_STORAGE_COMPARE_SEPARATOR);newCompare.length&&localStorage.setItem(LOCAL_STORAGE_COMPARE_KEY,compareNewLocalStorage),Array.from(document.querySelectorAll(`[data-rem-handle="${el.getAttribute("data-rem-handle")}"]`)).forEach(function(elem){elem.remove()});const buttonsCompareArray=document.querySelectorAll(selectorsCompare.buttonCompare);buttonsCompareArray.length&&buttonsCompareArray.forEach(buttonCompare=>{const productHandle=buttonCompare.dataset.productHandle;elHandle===productHandle&&buttonCompare.classList.remove(BUTTON_COMPARE_ACTIVE_CLASS)})},setRemoveCompareBtn=removeButtons=>{removeButtons.forEach(removeButton=>{removeButton.dataset.remHandle&&removeButton.addEventListener("click",()=>{removeProduct(removeButton),initBtnCompareList()})})},initRemoveBtn=()=>{const removeButtons=document.querySelectorAll(selectorsCompare.removeItem)||[];if(removeButtons.length)setRemoveCompareBtn(removeButtons);else return};getCompareListBtn&&getCompareListBtn.addEventListener("click",()=>{getCompareWrapper.append(createCompareItem),createProduct();let request=new XMLHttpRequest;request.open("GET",""),request.onload=function(){SPR.registerCallbacks(),SPR.initRatingHandler(),SPR.initDomEls(),SPR.loadProducts(),SPR.loadBadges()},request.send(),$(getCompareList).fadeIn("slow"),getCompareList.style.display="flex"});function strip(html){var tmp=document.createElement("div");return tmp.innerHTML=html,tmp.textContent||tmp.innerText}const createProduct=()=>{createCompareItem.innerHTML="";let products=getCompare(),urls=[];for(let i=0;i<products.length;i++)urls.push(`/collections/all/products/${products[i]}.js`);$.fancybox.showLoading(),Promise.all(urls.map(url=>fetch(url))).then(responses=>Promise.all(responses.map(res=>res.json()))).then(productData=>{$.fancybox.hideLoading();let productImage="",productAvailable="",productDescription="",productType="",productPrice="",productMoneyCurrency="",productOptionsSize="",productOptionsColor="",productOptionsType="",productOptionsVendor="",productOptionsRating="",productInfo="",productOptionBtn="",hideSizeElemByClass="",hideColorElemByClass="",productOptionsSizeArray=[],productOptionsColorArray=[],resultOpts=[];product.useCompareSize===!1&&(hideSizeElemByClass="d-none"),product.useCompareColor===!1&&(hideColorElemByClass="d-none"),typeof theme.moneyFormat<"u"&&(productMoneyCurrency=theme.moneyFormat.split("{")[0]);function dayCount(elem){let day=new Date(elem);return day.setDate(day.getDate()+parseInt(product.newProductsPeriod)),day}for(let i=0;i<productData.length;i++){var now=new Date;let newBadge=" ";if(now<=dayCount(productData[i].created_at)&&(newBadge=`<span class="product_badge new">${theme.strings.compareNew}</span>`),productOptionsSizeArray.push("-"),productOptionsColorArray.push("-"),productData[i].options){let optsAll=productData[i].options;product.useCompareSize===!0&&product.textCompareSize!=""&&(optsAll=optsAll.filter(obj=>obj.name.toLowerCase()!==product.textCompareSize)),product.useCompareColor===!0&&product.textCompareColor!=""&&(optsAll=optsAll.filter(obj=>obj.name.toLowerCase()!==product.textCompareColor)),resultOpts=optsAll.map(opt=>opt.values=="Default Title"?'<p class="mt-0 mb-1">-</p>':'<p class="mt-0 mb-1"><span class="opt-name">'+opt.name+":</span>&nbsp;"+opt.values.join(", ")+"</p>").join(" "),productData[i].options.forEach(function(item){let optionName=item.name.toLowerCase(),optionValue=item.values,value="";Array.isArray(optionValue)?value=optionValue.join(", "):value=optionValue,optionName===`${product.textCompareSize}`?value==""||value=="Default Title"?productOptionsSizeArray.splice(i,1,"-"):productOptionsSizeArray.splice(i,1,value):optionName===`${product.textCompareColor}`&&(value==""||value=="Default Title"?productOptionsColorArray.splice(i,1,"-"):productOptionsColorArray.splice(i,1,value))})}resultOpts.length?productOptionsType+=` 
                            <div class="productContent" data-rem-handle="${productData[i].handle}">
                                <div class="itemOption_1">${resultOpts}</div>
                            </div>
                    `:productOptionsType+=`
                            <div class="productContent" data-rem-handle="${productData[i].handle}">
                                <div class="itemOption_1">-</div>
                            </div>
                        `,productOptionsSizeArray.length&&product.useCompareSize===!0&&(productOptionsSize+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="itemOption_1">${productOptionsSizeArray[i]}</div>
                        </div>`),productOptionsColorArray.length&&product.useCompareColor===!0&&(productOptionsColor+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="itemOption_1">${productOptionsColorArray[i]}</div>
                        </div> `);let saleBadge="";productData[i].price_varies?(saleBadge=`<span class="product_badge sale">${theme.strings.compareSale}</span>`,productPrice=`<span class="product-price product-sale-price ">${productMoneyCurrency}${(productData[i].price_min/100).toFixed(2)}</span> <span class="product-regular-price">${productMoneyCurrency}${(productData[i].compare_at_price/100).toFixed(2)}</span>`):productPrice=`<span class="product-price">${productMoneyCurrency}${(productData[i].price/100).toFixed(2)}</span>`,productImage+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="compareRemoveItem" remove-item data-rem-handle="${productData[i].handle}">${theme.strings.compareRemove}</div>
                            ${saleBadge}
                            ${newBadge}
                        <img loading="lazy"  class="productImage" src="${productData[i].featured_image}" srcset="${productData[i].featured_image}" alt="${productData[i].title}">

                        </div>

                    `,productInfo+=`<div class="productContent" data-rem-handle="${productData[i].handle}">
                        <a href="${productData[i].url}"><h5 class="compareProductTitle">${productData[i].title}</h5></a>
                    </div>
                    `;let availableItem="";productData[i].available===!0?availableItem='<i style="color: #44bb9e;" class="fa fa-check" aria-hidden="true"></i>':availableItem='<i class="fa fa-times" aria-hidden="true"></i>',productAvailable+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                                <span class="description">${availableItem}</span>
                        </div>

                    `,productDescription+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="description">${strip(productData[i].description)}</div>
                        </div>

                    `,productType+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                            <div class="description"><a href="/collections/types?q=${productData[i].type}"> ${productData[i].type}</a></div>
                        </div>

                    `,productOptionsVendor+=`
                        <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <div class="description"><a href="/collections/vendors?q=${productData[i].vendor}"> ${productData[i].vendor}</a></div>
                        </div>

                    `,productOptionsRating+=`
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                    <div class="description">
                        <span class="shopify-product-reviews-badge" data-id="${productData[i].id}"></span>
                    </div>
                    </div>

                    `,productOptionBtn+=`
                    <div class="productContent" data-rem-handle="${productData[i].handle}">
                        <h4>${productPrice}</h4>
                        <a class="btn btn-sm btn-primary compareBtn" href="${productData[i].url}">More details</a>
                     </div>
                    `}createCompareItem.innerHTML+=`<div class="itemWrapper">
                        <li class="row">
                                <span class="compare_item_option col-4">${theme.strings.compareImg}</span>
                                <div class="infoWrapper px-0 col-8">
                                    <div class="itemImgWrap">
                                    ${productImage}
                                    </div>
                                </div>
                            </li>

                            <li class="row compare__row__title">
                            <span class="compare_item_option col-4">${theme.strings.compareTitle}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                ${productInfo}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareDetails}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                ${productOptionBtn}
                                </div>
                            </div>
                        </li>


                        <li class="row" id="compare__rating">
                            <span class="compare_item_option col-4">${theme.strings.compareRating}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productOptionsRating}
                                </div>

                            </div>
                        </li>


                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareAvailable}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                ${productAvailable}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareVendor}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productOptionsVendor}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareType}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productType}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareDescription}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productDescription}
                                </div>
                            </div>
                        </li>

                        <li class="row ${hideSizeElemByClass}">
                            <span class="compare_item_option col-4">${product.textCompareSize}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productOptionsSize} 
                                </div>
                            </div>
                        </li>


                        <li class="row ${hideColorElemByClass}">
                            <span class="compare_item_option col-4">${product.textCompareColor}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productOptionsColor}
                                </div>
                            </div>
                        </li>

                        <li class="row">
                            <span class="compare_item_option col-4">${theme.strings.compareOptions}</span>
                            <div class="infoWrapper px-0 col-8">
                                <div class="itemImgWrap">
                                    ${productOptionsType}
                                </div>
                            </div> 
                        </li>
                </div>`,initRemoveBtn()})};let getCompareClose=document.getElementById("compareClose");getCompareClose.addEventListener("click",()=>{getCompareList&&$(getCompareList).fadeOut("slow")});let compareClearAllBtn=document.getElementById("compareClearAll");compareClearAllBtn.addEventListener("click",()=>{resetCompare()});
//# sourceMappingURL=/cdn/shop/t/3/assets/compare.js.map?v=121397200913565227181671783119
