import React from 'react';
import { NavLink } from '@mantine/core';
import { IconStar } from '@tabler/icons';
import { tokenFetch } from 'network/tokenFetch';

const NotificationTest = props => {

    function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');
    
        var rawData = window.atob(base64);
        var outputArray = new Uint8Array(rawData.length);
    
        for (var i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    function subscribeUserToPush(vapid_public_key) {
        console.log('subscribing?', vapid_public_key)
        navigator.serviceWorker.ready.then((registration) => { console.log('READY') } )

        const result = navigator.serviceWorker.ready.then((registration) => {
            const subscribeOptions = {
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(vapid_public_key),
            };
            console.log('step 2', subscribeOptions)
            return registration.pushManager.subscribe(subscribeOptions);
          })
          .then(function (pushSubscription) {
            console.log(
              'Received PushSubscription: ',
              JSON.stringify(pushSubscription),
            );
            tokenFetch('/subscribe', pushSubscription)
            return pushSubscription;
          })
          .then( );
        return result
      }

    async function remoteNotification() {
      console.log('remote notify')
      const result = await tokenFetch('/notify')
      console.log('remote notify result', result)
    }

    function showNotification() {
      console.log('show local notify')
      Notification.requestPermission((result) => {
        if (result === "granted") {
          console.log('granted')
          navigator.serviceWorker.ready.then((registration) => {
            console.log('reg')
            registration.showNotification("Vibration Sample", {
              body: "Buzz! Buzz!",
              icon: "../icons/sofaicon.png",
              vibrate: [200, 100, 200, 100, 200, 100, 200],
              tag: "vibration-sample",
            });
          });
        } else {
          console.log('no permission')
        }
      });
    }

    async function subscribe() {
      const key_result = await tokenFetch('/subscribe')
      console.log('key result', key_result)
      const vapid_public_key = key_result.vapid_public_key
      console.log('vapid public key', vapid_public_key)
      subscribeUserToPush(vapid_public_key)
    }

    return (
        <>
        <NavLink 
            icon={<IconStar size={20} />}
            onClick={ showNotification }
            variant="light"
            label="Local Notify" 
        />
        <NavLink 
            icon={<IconStar size={20} />}
            onClick={ remoteNotification }
            variant="light"
            label="Notify" 
        />
        <NavLink 
            icon={<IconStar size={20} />}
            onClick={ subscribe }
            variant="light"
            label="Subscribe" 
        />
        </>
    )
}

export default NotificationTest