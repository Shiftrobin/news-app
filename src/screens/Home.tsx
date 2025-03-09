import { ActivityIndicator, FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { colors,Tabs } from '../constants'
import News from './News';
import { HomeScreenNavigationProp,NewsData } from '../../type';
import { useNavigation } from '@react-navigation/native';
import { NEWS_API_KEY } from '../../config';
import Loader from '../components/Loader';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [news, setNews] = useState<NewsData[]>();
    const [page, setPage] = useState(1);
    const Navigation = useNavigation<HomeScreenNavigationProp>();
    const [selectedTab, setSelectedTab] = useState(Tabs[0]);
    const perPage = 10;
    
    type Tab = (typeof Tabs)[number];

    const CATEGORY_MAP : Record<Tab, string> = {
        'Top Stories': 'general',
        Business: 'business',
        Politics: 'politics',
        Science: 'science',
        Technology: 'technology',       
    }

    useEffect(() => {
        if(page > 1){
            getData(page);
        }else{
            getData(1);
        }       
    }, [selectedTab, page]);

     //load more pagination 
     const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1 );
     }
         
    
    const getData = async (page:number) => {
        try {
            setLoading(true);

            const category = CATEGORY_MAP[selectedTab];

            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${perPage}`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'GET',
                },

            );

            const data = await response.json();
           // console.log(data);

           if(data?.status === 'ok') {
             setNews(prevNews => 
                page === 1 ? data?.articles : [...prevNews, ...data?.articles],
             );
           }



        } catch(error) {
            console.log('Error Fetching Data', error);
        } finally {
            setLoading(false);
        }
    }

    // Tab Items
    const renderTabItem = ({item}: {item: string})=>(
        <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab(item)}>
            <Text style={[styles.tabText, item === selectedTab && styles.tabTextActive]}>{item}</Text>
        </TouchableOpacity>
    )

    // News Items
    const renderNewsCard = ({item}: {item: NewsData})=> (
        <TouchableOpacity style={styles.card} onPress={()=> Navigation.navigate('News',{item}) }>
            {item?.urlToImage && (
                <Image 
                    source={{uri:item.urlToImage}} 
                    resizeMode='cover' 
                    style={styles.image} 
                />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.description}</Text>
                <Text style={styles.publishedAt}>
                    Published at: {new Date(item?.publishedAt).toLocaleString()}
                </Text>
            </View>

        </TouchableOpacity>
    );
 
    return (
        <View>
            <Header />
            <View>
                {/* TabView */}
                <FlatList 
                    data={Tabs} 
                    keyExtractor={item=> item} 
                    renderItem={renderTabItem} 
                    horizontal 
                    contentContainerStyle={styles.tabContainer}
                    showsHorizontalScrollIndicator={false}
                />
                {/* NewView */}
            </View>
                {
                    loading && page===1 ? 
                    ( <Loader /> )
                    :(
                    <FlatList 
                        data={news} 
                        keyExtractor={(item,index) =>index.toString()} 
                        renderItem={renderNewsCard} 
                        contentContainerStyle={styles.list}
                        onEndReachedThreshold={0.5}
                        onEndReached={handleLoadMore}
                        ListFooterComponent={<ActivityIndicator size="large" color={colors.grey} style={styles.indicatorStyle} />}
                        />
                    ) 
                }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    list: {
        padding: 16,
        paddingBottom: 120,
    },
    header: {
        backgroundColor: '#000',
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tabContainer: {
        // paddingVertical: 10,
        marginVertical: 1,
        paddingHorizontal: 16,
    },
    tab: {
        marginRight: 20,
    },
    tabText: {
        color: '#000',
        fontSize: 16,
    },
    tabTextActive: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    card: {
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#00000050',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
    },
    cardContent: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
    },
    publishedAt: {
        fontSize: 12,
        color: '#666',
    },
    indicatorStyle: {
        marginVertical: 5,
    }

})