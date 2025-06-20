import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Text, Card, ActivityIndicator } from 'react-native-paper';
import { COLORS, SPACING, TYPOGRAPHY } from 'src/constants/theme';
import ScreenHeader from 'src/components/ScreenHeader';

const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement actual stock search
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const renderStockItem = ({ item }: { item: typeof POPULAR_STOCKS[0] }) => (
    <Card style={styles.card} onPress={() => console.log(`Selected ${item.symbol}`)}>
      <Card.Content style={styles.cardContent}>
        <View>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Search" subtitle="Find stocks to trade" />
      <View style={styles.content}>
        <Searchbar
          placeholder="Search stocks..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        {loading ? (
          <ActivityIndicator style={styles.loader} color={COLORS.primary} />
        ) : searchQuery ? (
          <Text style={styles.message}>No results found</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Popular Stocks</Text>
            <FlatList
              data={POPULAR_STOCKS}
              renderItem={renderStockItem}
              keyExtractor={(item) => item.symbol}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  searchBar: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  card: {
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbol: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  name: {
    ...TYPOGRAPHY.body2,
    color: COLORS.subtext,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  message: {
    ...TYPOGRAPHY.body1,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
  loader: {
    marginTop: SPACING.xl,
  },
});

export default SearchScreen; 