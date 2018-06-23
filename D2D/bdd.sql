--------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `nom` varchar(250) NOT NULL,
  `page` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `nom`, `page`) VALUES
(1, 'Drone Racing', 'dr.php'),
(2, 'Drone Pro', 'dp.php'),
(3, 'Drone Camera', 'dc.php'),
(4, 'Drone Loisir', 'dl.php');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id_drone` int(11) NOT NULL,
  `id_cat` int(11) NOT NULL,
  `nom_drone` varchar(100) NOT NULL,
  `prix` int(11) NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL,
  `autonomie` text NOT NULL,
  `poids` int(11) NOT NULL,
  `camera` varchar(100) NOT NULL,
  `porter` int(11) NOT NULL,
  `vitesse` int(11) NOT NULL,
  `resolution` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id_drone`, `id_cat`, `nom_drone`, `prix`, `image`, `description`, `autonomie`, `poids`, `camera`, `porter`, `vitesse`, `resolution`) VALUES
(1, 1, 'TBS OBVLIVION PNP', 330, 'BIEN LE BONJOUR', 'Le premier drone racer monocorps en polymère composite injecté.\r\nRace Ready, 120 km/h de vitesse maximale et jusqu\'à 11 minutes de temps de vol hors de la boîte.', '11', 315, 'Caméra TBS Oblivion 650TVL FPV', 0, 120, ''),
(2, 1, 'SKITZO NOVA BNF BY DFR', 599, 'images/tbs.jpg', 'Le SKITZO Nova est conçu pour la FPV freestyle et dispose d\'une conception avec batterie sur le dessus et d\'un corps symétrique en fibre de carbone.\r\nNous avons équipé cette version avec les composant skitzo ,moteur Lumenier Skitzo et Carte de vol FlightOne Skitzo OSD, des composant tous aussi excellent une predator mini et une esc Lunenier BlHeli 32.', '15', 240, '', 12, 100, '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `nom` varchar(255) CHARACTER SET utf8 NOT NULL,
  `prenom` varchar(132) COLLATE utf8_unicode_ci NOT NULL,
  `mail` text CHARACTER SET utf8 NOT NULL,
  `password` text CHARACTER SET utf8 NOT NULL,
  `adresse` text COLLATE utf8_unicode_ci NOT NULL,
  `code_postale` int(5) NOT NULL,
  `ville` text COLLATE utf8_unicode_ci NOT NULL,
  `idpublic` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_drone`),
  ADD KEY `id_cat_const` (`id_cat`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id_drone` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `id_cat_const` FOREIGN KEY (`id_cat`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
