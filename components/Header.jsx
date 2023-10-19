import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Logo from '../public/images/playVerseLogo.png'
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';

import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
    formatSUI
} from "@suiet/wallet-kit";

const style = {
    wrapper: `bg-black w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` flex items-center align-right justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const notify = () => toast.error('Incorrect chain! - Support Sui Testnet only');

const Header = () => {
    const router = useRouter();
    const wallet = useWallet();
    const [searchQuery, setSearchQuery] = useState("");

    console.log("wallet", wallet)

    useEffect(() => {
        if (wallet && wallet.connected) {
            if (wallet.chainId !== SuiChainId) {
                notify();
            }
        }
    }), [wallet];

    return (
        <div className={style.wrapper}>
            <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                passHref
                className="text-secondary hover:text-white"
            >
                <div className="flex items-center cursor-pointer">
                    <Image src={Logo} height={30} width={50} alt="logo" />

                    <div className="ml-[0.8rem] text-white text-2xl font-serif">PlayVerse</div>
                </div>
            </Link>
            {/* search bar to search streams */}
            <div className={style.searchBar}>
                <div className={style.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input
                    className={style.searchInput}
                    type="text"
                    value={searchQuery}
                    placeholder="Enter Your Streaming ID"
                //  onKeyPress={(e) => {
                // if (e.key === 'Enter')
                //     console.log(searchQuery)
                // }}
                />
                <button
                    onClick={() => {
                        router.push(`/streaming/${searchQuery}`);
                    }}
                    className="text-white px-2"
                >
                    Search
                </button>
            </div>

            <div className={style.headerItems}>
                <Link href="/streaming">
                    {/* <div className={style.headerItem}> Streaming </div> */}
                </Link>
                <div
                    className={style.headerItem}
                    onClick={() => {
                        router.push("/tournament");
                    }}
                >
                    Tournament
                </div>
                <div
                    className={style.headerItem}
                    onClick={() => {
                        router.push("/nft");
                    }}
                >
                    Mint NFT
                </div>
                <div
                    className={style.headerIcon}
                    onClick={() => {
                        router.push(`/profile/${address}`);
                    }}
                >
                    <CgProfile />
                </div>
                <div className={style.headerIcon}>
                    <MdOutlineAccountBalanceWallet />
                </div>
                <div>
                    <ConnectButton className="bg-gradient-to-l from-purple-400 to-green-400">
                        Connect Wallet
                    </ConnectButton>
                </div>
            </div>

            {wallet && wallet.connected && (
                <div >
                    <Toaster />
                </div>
            )}

        </div>
    );
};

export default Header;
