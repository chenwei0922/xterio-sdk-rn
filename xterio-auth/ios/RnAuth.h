
#ifdef RCT_NEW_ARCH_ENABLED
#import "generated/RNRnAuthSpec/RNRnAuthSpec.h"
#else
#import <React/RCTBridgeModule.h>
#endif

@interface RnAuth : NSObject
<
#ifdef RCT_NEW_ARCH_ENABLED
NativeRnAuthSpec
#else
RCTBridgeModule
#endif
>
@end
