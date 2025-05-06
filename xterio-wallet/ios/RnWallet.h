#ifdef RCT_NEW_ARCH_ENABLED
#import <RnWallet/RNRnWalletSpec.h>
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RnWallet : NSObject <
#ifdef RCT_NEW_ARCH_ENABLED
NativeRnWalletSpec
#else
RCTBridgeModule
#endif
>

@end
