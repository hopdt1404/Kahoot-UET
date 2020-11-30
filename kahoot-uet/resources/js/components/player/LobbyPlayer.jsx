import React, {useEffect, useState} from "react";
import IndexPlayer from "./IndexPlayer";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

function LobbyPlayer() {

    // useEffect(() => {
    //     const socket = io('http://127.0.0.1:6001');
    //     socket.on('ma kenh', {

    //     })
    // })

    // const [idToken, setIdToken] = useState("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYmI2YzY0YjY5ZjMxOGEwNjdjNzAyODNmNDMyMTgyMzMzMDhhYWQ0NzRjNjk3NmZiMjRmYjgzOTc1M2QyNmQ4YWE4ZGY1MDM2ZjMxMTExZmQiLCJpYXQiOjE2MDY0OTI2MTcsIm5iZiI6MTYwNjQ5MjYxNywiZXhwIjoxNjM4MDI4NjE3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.J45fEEXahIB3b0WeEYIbcO14a7SOziZYNENbuE_khjkQuXlogZbptO9YzqDx_GJRD3W1d5be1JIwM48wuCTxp5XotHM64zJ6DliGRPSPp10gNZ0Z7GhZaKm7TogXmFukKDrYS-bY4PX6Fua0tGTOVn2XTXwIllJFYfdBlceldNydE59N4k_VBHNLO99lKK2_NyMcFEYGSJFEZAK2Bgkp6PRlmhGCWVBq8NxI2OrK3kr6XcoyLKM0qi2rtqiNLLsb55OUX01wYY4IlH9Bp_xwB3gUb8Vz85fFUvyK8ZSYCAr-qh5edUzuW7MdwFSH86iFb_pLlHzLsBoTAawW9pvhbplmXDKAQqGmr9Z5YRr9Ep_7KSGwMCucN2y1zPbNJOMjEqjfszAwQwjMbPlVRCHoDAR2WyG1m2kDP68Z_Y1yYUDb3zFSKxXIg9E30FNVOt2b0PFf0XffUr2xo9cMPrb64ICshAQfTqQRkWRXsWExmol69nBf7U06hMgM-v-oXQbxpFc3Msa4pOEJEzRka_p47dYzjScEsjqI67Ml8bBEuXOGqM7ye-EGM_i0tjLTicf5EfqRirJEn6zouDs-qHIbehzJLLLUlNx3JxCeCm_t9hqN4U30mdptbN0edjX3I4lbFW0fEPZ2e9mQ8puTE0XhXzA-HH9jH_Z-aykT7ciiPNk");

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/auth/topic', {
    //         headers: {
    //             "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiYTA0MGFiOTU1MmQ1ZTdlODQyOGQzYjI4YjM0YmI0MjNkNDQ5Y2RhZWQ0N2UyM2ExYjJjYzM5ZDE1Zjg2ZGExZjEzM2ZiNmIyMGE5NDg3OGYiLCJpYXQiOjE2MDY0OTU2NjMsIm5iZiI6MTYwNjQ5NTY2MywiZXhwIjoxNjM4MDMxNjYzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.f9nM5biBzssQlOzFv2KqNVJwBpVNxsOet7lfmKr86uI6_Qx4cF00FNaTgIib2ujkKIveusq5TYOMsQcvUDLOan773j4oxK_rQUN6_lZXkKBZqjzV29KGuK3v22ok17KtMwYZ_-u0L60kIO613zeKs2SA8O-la7sZ9gvrhN4IspsyTDVFqYSwd2IczLO_Con0wOnaNcrPSBJCGm3Kj51BeegYEuvF7udbekD3YZZrIhjWBWE0zrRMH-o5du-67WXc98V6xFV3N0lqgnRwVmmAbsLiuEZFJR9lMcSeFJmcorWKCLo2lCkmry7JWxpmmjwUDY06F2eXs2uLp210z0XR6T6fwH3256v5DMa0LLGzaw8cjOgUfKGQ7wSqJq6zZIQYHWUrkd3X_j6aXDGQtqo0NhTSTpX24JUQPoXhMM2n_D1SK1FR4-yNGuKLfDVETIOjv-RXdXjmJKzRb1JItb1u0WwQx49U4EG64cSHj0yIC7fR5imCm0EymhxrU-3Hb26_5-SDVcSmGz6Z7Bejt_sj2rvcbTT08jdiwN2eYgEcWWSJFBu8wI1b0uXLF4Gm1UUn-IxwjlToD44YiBHIdqjLZYXhBp-yQiC4dDgU6-IfiSScoPg9S3o2KaKVJzwhJ3qUEpbopWKV8NCznTLoJ3mci1WMGUAUb2hFkRj4wnw1FEo",
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res.data);
    //     }).catch( (err) => {
    //         console.log(err);
    //     })
    // })

    const pin = useSelector((state) => state.playGame.selectedPin);
    console.log(pin);

    return (
        <div>
            <IndexPlayer />
            <div className="lobby-main">
                <h1 className="text-1">You're in!</h1>
                <h3 className="text-2">See you nickname on screen?</h3>
            </div>
        </div>
    );
}

export default LobbyPlayer;
