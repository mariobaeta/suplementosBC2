
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.b4200001f3c17a8e2777.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/871.latest.en.c975ea387f3b7a8ca449.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/1328.latest.en.c47910bb29b00f5adef6.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4085.latest.en.038fd3ba3e4f54208a8b.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.ed55d68f11b15cd04241.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2542.latest.en.e8b98a9ed829efc0c730.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/400.latest.en.07596a4ca44205a6b702.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2080.latest.en.5117e670600bcaf49bb5.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5767.latest.en.3a1785a13826d8adbd3f.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/4387.latest.en.3e2bfd1229068cab2e95.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/5718.latest.en.dfa1d4fb0b2a6285d83d.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/2714.latest.en.6d1da9beed9e9fb7ab5a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/668.latest.en.33cd51b25523fedea6a0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.1865f27d12296aad035b.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/871.latest.en.de22b83672b7fe512099.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.eaaefad77ff32465e9ee.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.b29aa02f3a9cc3ddd45f.css"];
      var fontPreconnectUrls = ["https://fonts.shopifycdn.com"];
      var fontPrefetchUrls = ["https://fonts.shopifycdn.com/lato/lato_n4.c86cddcf8b15d564761aaa71b6201ea326f3648b.woff2?h1=dGhlbWUxMTc4LWJpb25hLm15c2hvcGlmeS5jb20&hmac=8c8091bee26ddc175ea2eba077b0703bff160406b9a3298b151a2beee4c356e4","https://fonts.shopifycdn.com/lato/lato_n7.f0037142450bd729bdf6ba826f5fdcd80f2787ba.woff2?h1=dGhlbWUxMTc4LWJpb25hLm15c2hvcGlmeS5jb20&hmac=712564cf067378ae3a701d0226a56c88d5c5d0602e86b49aa9d726f6c27230d2","https://fonts.shopifycdn.com/source_sans_pro/sourcesanspro_n4.c85f91ea821d792887902daa9670754f7c64e25c.woff2?h1=dGhlbWUxMTc4LWJpb25hLm15c2hvcGlmeS5jb20&hmac=56d285d089c789cccec94980de925a05855bd87fe996f24abf19df7528c8ff1f","https://fonts.shopifycdn.com/source_sans_pro/sourcesanspro_n6.91ba95a725d9bdfe4971390fba64eb8dfe38af4a.woff2?h1=dGhlbWUxMTc4LWJpb25hLm15c2hvcGlmeS5jb20&hmac=6210fabc6cb662d701793967bbe7235e5c9dc5a90e15efc270e19a456a8e18ee"];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  