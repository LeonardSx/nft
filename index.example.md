 ## Moment
 
    <header class="fixed top-0 z-20 w-full bg-[#161616]">
      <div class="flex items-center px-6 py-6 xl:px-24">
        <a class="shrink-0" href="">
          <img
            class="h-12"
            src="https://i.postimg.cc/PfLSyJR0/XCris-X-A-futuristic-ultra-detailed-red-soldier-logo-in-8-K-cinem-ece234d7-7a37-4e11-8a73-dc0fa5077731.png"
            alt=""
          />
        </a>
        <div
          class="invisible lg:visible fixed inset-0 z-10 ml-auto items-center bg-white opacity-0 lg:relative lg:inset-auto lg:flex lg:bg-transparent lg:opacity-100"
        >
          <nav class="w-full">
            <ul class="flex flex-col lg:flex-row menu" id="menu-logged-in">
              <li>
                <a
                  href="/dashboard.html"
                  class="flex items-center justify-between py-3.5 lg:px-5 text-gray-600 hover:text-red-600"
                  aria-expanded="false"
                  style="transition: color 0.5s ease, text-shadow 0.5s ease"
                >
                  Dashboard
                </a>
              </li>
              <button class="boton" id="logoutButton" onclick="logoutWithMetaMask()">
                <img
                  src="./static/assets/MetaMask_Fox.svg"
                  alt="Logo"
                  class="logo"
                />
                <span id="connectButtonText">LOGOUT</span>
              </button>
            </ul>
          </nav>
        </div>
      </div>
    </header>